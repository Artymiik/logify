package user

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
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

// login router
func (h *Handler) handleLogin(w http.ResponseWriter, r *http.Request) {}

// registration router
func (h *Handler) handleRegister(w http.ResponseWriter, r *http.Request) {
	// -----------------
	// Получаем данные пользователя
	// -----------------
	var payload types.RegisterUserPayload

	// Отправляем пользователю ошибку, что не все поля заполнены
	if err := utils.ParseJSON(r, payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// Получаем пользователя по email
	_, err := h.store.GetUserByEmail(payload.Email)
	// если такой email есть, то ошибка
	if err != nil {
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
		LastName: payload.LastName,
		Email: payload.Email,
		Password: hashedPassword,
	})

	// обработка ошибка
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// отправка пользователю то что все ок
	utils.WriteJSON(w, http.StatusCreated, nil)
}
