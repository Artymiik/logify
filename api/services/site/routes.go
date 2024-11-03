package site

import (
	"fmt"
	"net/http"

	"github.com/Artymiik/logify/interfaces"
	"github.com/Artymiik/logify/pkg"
	"github.com/Artymiik/logify/services/auth"
	"github.com/Artymiik/logify/types"
	"github.com/Artymiik/logify/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store     interfaces.ISite
	userStore interfaces.IUser
}

func NewHandler(store interfaces.ISite, userStore interfaces.IUser) *Handler {
	return &Handler{store: store, userStore: userStore}
}

// -------------------
// Функция для определения routers
// -------------------
func (h *Handler) RegisterRoutes(router *mux.Router) {
	// создания сайта
	router.HandleFunc("/create/site", auth.WithJWTAuth(h.handleCreateSite, h.userStore)).Methods("POST")
	// вывод всех сайтов по userID
	router.HandleFunc("/select/sites", auth.WithJWTAuth(h.handleSelectSites, h.userStore)).Methods("GET")
}

// -----------------------
// Функции для routers
// -----------------------

// ------------------------------
// ------------------------------
// CREATE SITE ROUTER
// ------------------------------
func (h *Handler) handleCreateSite(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	var userId int = auth.GetUserIDFromContext(r.Context())

	// Получаем данные пользователя
	var payload *types.CreateSitePayload

	// Отправляем пользователю ошибку, что не все поля заполнены
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	// Валидация данных от пользователя
	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid payload: %s", errors))
		return
	}

	// проверка активной ссылки сайта
	if err := pkg.CheckWebSite(payload.SiteLink); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// создание сайта
	err := h.store.CreateSite(types.Site{
		UserId:      userId,
		Name:        payload.SiteName,
		Description: payload.SiteDescription,
		Link:        payload.SiteLink,
		Status:      "Published",
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// отправка пользователю то что все ок
	utils.WriteJSON(w, http.StatusCreated, "The site has been successfully created!")
}

// ------------------------------
// ------------------------------
// SLECT SITES BU USERID ROUTER
// ------------------------------
func (h *Handler) handleSelectSites(w http.ResponseWriter, r *http.Request) {
	// Проверка на кол-во запросов от пользователя
	limiter := utils.DDosPropperty()
	if limiter.Available() == 0 {
		utils.WriteError(w, http.StatusTooManyRequests, fmt.Errorf("too many requests"))
		return
	}

	// Получаем id пользователя
	var userID int = auth.GetUserIDFromContext(r.Context())

	// получаем все сайты по userID
	sites, err := h.store.GetSitesByUserID(userID)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// отправка пользователю то что все ок
	utils.WriteJSON(w, http.StatusOK, sites)
}
