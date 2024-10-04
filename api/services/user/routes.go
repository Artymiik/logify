package user

import (
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"github.com/sikozonpc/ecom/config"
	"github.com/sikozonpc/ecom/services/auth"
	"github.com/sikozonpc/ecom/types"
	"github.com/sikozonpc/ecom/utils"
)

type Handler struct {
	store types.UserStore
}

func NewHandler(store types.UserStore) *Handler {
	return &Handler{store: store}
}

// -------------------
// Функция для определения routers
// -------------------
func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/signin", h.handleLogin).Methods("POST")
	router.HandleFunc("/signup", h.handleRegister).Methods("POST")
}

// -----------------------
// Функции для routers
// -----------------------

// ----------------------
// ----------------------
// LOGIN ROUTER
// ----------------------
func (h *Handler) handleLogin(w http.ResponseWriter, r *http.Request) {
	// -----------------
	// Получаем данные пользователя
	// -----------------
	var payload *types.LoginUserPayload

	// Отправляем пользователю ошибку, что не все поля заполнены
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// Валидация данных от пользователя
	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	// Получаем пользователя по email
	u, err := h.store.GetUserByEmail(payload.Email)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("not found, invalid email/password"))
		return
	}

	// Проверка пароля в БД и введеного
	if !auth.ComprasePassword(u.Password, []byte(payload.Password)) {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("not found, invalid email/password"))
		return
	}

	// Создание JWT Token для пользователя
	// Получение ключа JWT
	secret := []byte(config.Envs.JWTSecret)
	// Создаем JWT Token
	token, err := auth.CreateJwt(secret, u.ID)
	// Обработка ошибок JWT
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, map[string]string{"token": token})
}

// ----------------------
// ----------------------
// REGISTRATION ROUTER
// ----------------------
func (h *Handler) handleRegister(w http.ResponseWriter, r *http.Request) {
	// -----------------
	// Получаем данные пользователя
	// -----------------
	var payload *types.RegisterUserPayload

	// Отправляем пользователю ошибку, что не все поля заполнены
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// Валидация данных от пользователя
	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	// Получаем пользователя по email
	_, err := h.store.GetUserByEmail(payload.Email)
	// если такой email есть, то ошибка
	if err == nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("user with email %s already axists", payload.Email))
		return
	}

	// хеширование пароля
	hashedPassword, err := auth.HashPassword(payload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// создание пользователя
	err = h.store.CreateUser(types.User{
		FirstName: payload.FirstName,
		LastName:  payload.LastName,
		Email:     payload.Email,
		Password:  hashedPassword,
	})

	// обработка ошибка
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// отправка пользователю то что все ок
	utils.WriteJSON(w, http.StatusCreated, nil)
}
