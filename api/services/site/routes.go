package site

import (
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"github.com/sikozonpc/ecom/services/auth"
	"github.com/sikozonpc/ecom/services/check"
	"github.com/sikozonpc/ecom/types"
	"github.com/sikozonpc/ecom/utils"
)

type Handler struct {
	store     types.SiteStore
	userStore types.UserStore
}

func NewHandler(store types.SiteStore, userStore types.UserStore) *Handler {
	return &Handler{store: store, userStore: userStore}
}

// -------------------
// Функция для определения routers
// -------------------
func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/create/site", auth.WithJWTAuth(h.handleCreateSite, h.userStore)).Methods("POST")
}

// -----------------------
// Функции для routers
// -----------------------

// ------------------------------
// ------------------------------
// CREATE SITE ROUTER
// ------------------------------
func (h *Handler) handleCreateSite(w http.ResponseWriter, r *http.Request) {
	userId := auth.GetUserIDFromContext(r.Context())

	// -----------------
	// Получаем данные пользователя
	// -----------------
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
	if err := check.CheckWebSite(payload.SiteLink); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}
	// if err != nil {
	// 	utils.WriteError(w, http.StatusBadRequest, err)
	// 	return
	// }

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
