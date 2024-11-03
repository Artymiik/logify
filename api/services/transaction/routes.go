package transaction

import (
	"fmt"
	"net/http"

	"github.com/Artymiik/logify/interfaces"
	"github.com/Artymiik/logify/services/auth"
	"github.com/Artymiik/logify/types"
	"github.com/Artymiik/logify/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store     interfaces.ITransaction
	logStore  interfaces.ILogs
	userStore interfaces.IUser
	siteStore interfaces.ISite
}

func NewHandler(store interfaces.ITransaction, logStore interfaces.ILogs, userStore interfaces.IUser, siteStore interfaces.ISite) *Handler {
	return &Handler{store: store, logStore: logStore, userStore: userStore, siteStore: siteStore}
}

func (h *Handler) RegisterRoutes(router *mux.Router) {
	// получение баланса текущего пользователя
	router.HandleFunc("/transaction/getBalance", auth.WithJWTAuth(h.handleGetBalance, h.userStore)).Methods("GET")
	// получение conect по запросу пользователя на опр. URL
	router.HandleFunc("/transaction/getConect", auth.WithJWTAuth(h.handleGetConect, h.userStore)).Methods("GET")
	// покупка конектов (карта) для поддержания активности log
	router.HandleFunc("/transaction/payment", auth.WithJWTAuth(h.handlePayment, h.userStore)).Methods("POST")
	// активация конектов через (секретное слово) пользователя
	router.HandleFunc("/transaction/active/conect", auth.WithJWTAuth(h.handleActiveConect, h.userStore)).Methods("POST")
	// история активных и уже использованных покупок конектов
	router.HandleFunc("/transaction/history/conects", auth.WithJWTAuth(h.handleHistoryConects, h.userStore)).Methods("GET")
}

// -----------------------
// Функции для routers
// -----------------------

// ------------------------------
// ------------------------------
// Получения баланса пользователя
// ------------------------------
func (h *Handler) handleGetBalance(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	// Получаем userID из context
	var userID int = auth.GetUserIDFromContext(r.Context())

	// получаем баланс пользователя по id
	balance, err := h.store.GetBalanceByUserID(userID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// возвращяем balance
	utils.WriteJSON(w, http.StatusOK, balance)
}

func (h *Handler) handleGetConect(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	// Получаем userID из context
	var userID int = auth.GetUserIDFromContext(r.Context())

	// Проверка на права получения конекта
	entitlement := h.store.HasConect(userID)
	if !entitlement {
		utils.WriteError(w, http.StatusForbidden, fmt.Errorf("no conect found"))
		return
	}

	// генерируем конект
	conect, err := h.store.ReturnsConect(userID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// возвращяем сгенерированный конект
	utils.WriteJSON(w, http.StatusOK, conect)
}

// ------------------------------
// ------------------------------
// Покупка конектов для поддержания активности log
// ------------------------------
func (h *Handler) handlePayment(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}
}

// ------------------------------
// ------------------------------
// Активация конектов через (секретное слово) пользователя
// ------------------------------
func (h *Handler) handleActiveConect(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	// Получаем userID из context
	var userID int = auth.GetUserIDFromContext(r.Context())

	// получаем данные от пользователя
	var payload *types.ActiveConectPayload

	// Отправляем пользователю ошибку, что не все поля заполнены
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Валидация данных от пользователя
	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %v", errors))
		return
	}

	// активация конекта от пользователя
	active_conect, err := h.store.ActiveConect(userID, payload.Conect)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// возвращаем активный конект пользователю
	utils.WriteJSON(w, http.StatusOK, active_conect)
}

// ------------------------------
// ------------------------------
// история активных и уже использованных покупок конектов
// ------------------------------
func (h *Handler) handleHistoryConects(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	// Получаем userID из context
	var userID int = auth.GetUserIDFromContext(r.Context())

	// Получение историю конектов пользователя
	history, err := h.store.HistoryConects(userID)

	// обработка ошибки
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}
	// отправка пользователю истории конектов
	utils.WriteJSON(w, http.StatusOK, history)
}
