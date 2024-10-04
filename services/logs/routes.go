package logs

import (
	"encoding/hex"
	"fmt"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"github.com/sikozonpc/ecom/services/auth"
	"github.com/sikozonpc/ecom/types"
	"github.com/sikozonpc/ecom/utils"
)

type Handler struct {
	store     types.LogsStore
	userStore types.UserStore
	siteStore types.SiteStore
}

func NewHandler(store types.LogsStore, userStore types.UserStore, siteStore types.SiteStore) *Handler {
	return &Handler{store: store, userStore: userStore, siteStore: siteStore}
}

// -------------------
// Функция для определения routers
// -------------------
func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/{site}/create/log", auth.WithJWTAuth(h.handleCreateLog, h.userStore)).Methods("POST")
	router.HandleFunc("/{site}/{log}/settings", auth.WithJWTAuth(h.handleSettingsLog, h.userStore)).Methods("POST")
	router.HandleFunc("/{site}/{log}/delete", auth.WithJWTAuth(h.handleDeleteLog, h.userStore)).Methods("POST")
	router.HandleFunc("/{site}/logs", auth.WithJWTAuth(h.handleSelectLogs, h.userStore)).Methods("GET") // Вывод logs по siteID
	router.HandleFunc("/{site}/{log}", auth.WithJWTAuth(h.handleSelectLogById, h.userStore)).Methods("GET")
	router.HandleFunc("/{site}/{log}/download", auth.WithJWTAuth(h.handleDownloadLog, h.userStore)).Methods("GET")

	router.HandleFunc("/insert", h.handleInsertLog).Methods("POST")
	router.HandleFunc("/select/{log}", h.handleSelectLog).Methods("GET")
}

// -----------------------
// Функции для routers
// -----------------------

// ------------------------------
// ------------------------------
// CREATE LOGS SITE ROUTER
// ------------------------------
func (h *Handler) handleCreateLog(w http.ResponseWriter, r *http.Request) {
	// Получаем id пользователя
	userId := auth.GetUserIDFromContext(r.Context())
	// Получаем пользователя
	u, err := h.userStore.GetUserById(userId)
	if err != nil {
		utils.WriteError(w, http.StatusForbidden, err)
		return
	}

	// получаем данные от пользователя
	var payload *types.CreateLogPayload

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

	// Получение сайта из URL
	vars := mux.Vars(r)
	siteName := vars["site"]

	// Получаем siteID из БД
	siteID, err := h.siteStore.GetSiteByName(siteName)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// --------------------------
	// Создаем log в json файле (log-userName[nameLog]-number(1)) log-aou9qf009q2[fojq8398fjoifd]-2.json
	// --------------------------
	// Получаем id сайта чтобы записать в файл
	getSiteID, err := h.siteStore.GetSiteById(u.ID)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Создаем файл log
	err = h.store.CreateLogFile(payload.Name, u.Email, getSiteID.ID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// ------------------------
	// создаем log в БД
	// ------------------------

	// создание уникального имени для client log
	uniqClientTxt := fmt.Sprintf("%s-%s", u.Email, time.Now())
	uniqClient, err := utils.UniqueLog([]byte(uniqClientTxt))
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// создаем log в БД
	err = h.store.CreateDefaultLog(types.Log{
		SiteID:       siteID.ID,
		Name:         payload.Name,
		UniqueClient: uniqClient,
		Router:       payload.Router,
	})

	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	// отправляем пользователю что все успешно
	utils.WriteJSON(w, http.StatusOK, "the log was successfully created")
}

// ------------------------------
// ------------------------------
// SETTINGS LOGS SITE ROUTER
// ------------------------------
func (h *Handler) handleSettingsLog(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSON(w, http.StatusOK, "OK")
}

// ------------------------------
// ------------------------------
// DELETE LOGS SITE ROUTER
// ------------------------------
func (h *Handler) handleDeleteLog(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSON(w, http.StatusOK, "OK")
}

// ------------------------------
// ------------------------------
// SELECTED ALL LOGS SITE ROUTER
// ------------------------------
func (h *Handler) handleSelectLogs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	siteName := vars["site"]

	siteID, err := h.siteStore.GetSiteByName(siteName)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	logs, err := h.store.SelectLogs(siteID.ID)
	if err != nil {
		utils.WriteError(w, http.StatusNotFound, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, logs)
}

// ------------------------------
// ------------------------------
// SELECTED LOG BY ID ROUTER
// ------------------------------
func (h *Handler) handleSelectLogById(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSON(w, http.StatusOK, "OK")
}

// ------------------------------
// ------------------------------
// DOWNLOAD LOGS SITE ROUTER
// ------------------------------
func (h *Handler) handleDownloadLog(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSON(w, http.StatusOK, "OK")
}

// ------------------------------
// ------------------------------
// INSERT LOG NPM ROUTER
// ------------------------------
func (h *Handler) handleInsertLog(w http.ResponseWriter, r *http.Request) {
	// получаем данные от пользователя
	var payload *types.InsertLogPayload

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

	// Переобразовние данных в 16 систему
	ciphertext, err := hex.DecodeString(payload.UniqueClient)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Декодирование уникального имени клиента
	deUniqueClient, err := utils.DeUniqueLog(ciphertext)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Получения данных для дальнейшиз действий
	log, err := h.store.GetLog(payload.UniqueClient)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}
	site, err := h.siteStore.GetSiteBySiteID(log.SiteID)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Составляем ссылку сайта
	link := fmt.Sprintf("%s%s", site.Link, log.Router)

	// Валидация данных по settings log
	if err := h.store.ValidatePayload(log, payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	// Запись в файл log
	err = h.store.InsertIntoFileLog(payload.UniqueClient, deUniqueClient, link, log)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, deUniqueClient)
}

// ------------------------------
// ------------------------------
// SELECT LOG NPM ROUTER
// ------------------------------
func (h *Handler) handleSelectLog(w http.ResponseWriter, r *http.Request) {
	utils.WriteJSON(w, http.StatusOK, "OK")
}
