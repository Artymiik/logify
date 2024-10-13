package auth

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/Artymiik/logify/config"
	"github.com/Artymiik/logify/interfaces"
	"github.com/Artymiik/logify/utils"
	"github.com/golang-jwt/jwt/v5"
)

type contextKey string
const UserKey contextKey = "userId"

// --------------------------
// Создаем JWT для пользователя
// --------------------------
func CreateJwt(secret []byte, userId int) (string, error) {
	// --------------------------
	// Время жизни jwt
	// --------------------------
	expiration := time.Second * time.Duration(config.Envs.JWTExpirationInSeconds)

	// --------------------------
	// Создаем сам JWT и загружаем в него payload
	// --------------------------
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": strconv.Itoa(userId),
		"expiredAt": time.Now().Add(expiration).Unix(),
	})

	// --------------------------
	// Сериализируем JWT в строку
	// --------------------------
	tokenString, err := token.SignedString(secret)
	if err != nil {
		return "", err
	}

	// --------------------------
	// Возвращаем сериализованный JWT
  // --------------------------
	return tokenString, nil
}

func WithJWTAuth(handlerFunc http.HandlerFunc, store interfaces.IUser) http.HandlerFunc {
	return func (w http.ResponseWriter, r *http.Request) {
		// ------------------------
		// ------------------------
		// Получение JWT Token из request пользователя
		// ------------------------
		tokenString := getTokenFromRequest(r)

		// ------------------------
		// Валидация JWT Token
		// ------------------------
		token, err := validateToken(tokenString)
		if err != nil {
			log.Printf("failed to validate token: %v", err)
			permissionDenied(w)
			return
		}

		// ------------------------
		// Проверка JWT Token
		// ------------------------
		if !token.Valid {
			log.Printf("invalid token")
			permissionDenied(w)
			return
		}

		// ------------------------
		// ------------------------
		// Получаем payload из JWT Token
		// ------------------------
		claims := token.Claims.(jwt.MapClaims)
		str := claims["userId"].(string)

		// ------------------------
		// Получаем userId из payload
		// ------------------------
		userId, _ := strconv.Atoi(str)

		// ------------------------
		// Смотрим существует ли пользователь с таким ID
		// ------------------------
		u, err := store.GetUserById(userId)
		if err != nil {
			log.Printf("failed to get user by id: %v", err)
			permissionDenied(w)
			return
		}

		// ------------------------
		// ------------------------
		// Передача контекста с информацией о пользователе
		// ------------------------
		ctx := r.Context()
		ctx = context.WithValue(ctx, UserKey, u.ID)
		r = r.WithContext(ctx)

		handlerFunc(w, r)
	}
}

// ----------------------------
// Получение JWT Token из Headers пользователя
// ----------------------------
func getTokenFromRequest(r *http.Request) string {
	// ----------------------------
	// Получение JWT Token из Header
	// ---------------------------
	tokenAuth := r.Header.Get("Authorization")

	// ----------------------------
	// Если все ок, то отправляем токен
	// ----------------------------
	if tokenAuth != "" {
		return tokenAuth
	}

	return ""
}

// ----------------------------
// Расшифровываем токен JWT и возвращаем результат
// ----------------------------

func validateToken(t string) (*jwt.Token, error) {
	// ----------------------------
	// Парсим JWT Token
	// ----------------------------
	return jwt.Parse(t, func(t *jwt.Token) (interface{}, error) {
		// ----------------------------
		// Смотри Methods
		// ----------------------------
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", t.Header["alg"])
		}

		// ----------------------------
		// Если все ок, возврашяем токен
		// ----------------------------
		return []byte(config.Envs.JWTSecret), nil
	})
}

// -----------------------
// Обработчик ошибок для пользователя
// -----------------------
func permissionDenied(w http.ResponseWriter) {
	utils.WriteError(w, http.StatusForbidden, fmt.Errorf("permission denied"))
}

// ---------------------------------
// Получение ID пользователя из context
// ---------------------------------
func GetUserIDFromContext(ctx context.Context) int {
	userId, ok := ctx.Value(UserKey).(int)
	if !ok {
		return -1
	}

	return userId
}
