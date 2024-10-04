package api

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sikozonpc/ecom/services/logs"
	"github.com/sikozonpc/ecom/services/site"
	"github.com/sikozonpc/ecom/services/user"
)

type APIServer struct {
	addr string
	db   *sql.DB
}

func NewAPIServer(addr string, db *sql.DB) *APIServer {
	return &APIServer{
		addr: addr,
		db:   db,
	}
}

// -------------------
// Запуск API для сервера
// -------------------
func (s *APIServer) Run() error {
	// -------------------
	// Создания router и префикс /api/v1
	// -------------------
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1").Subrouter()

	// --------------------
	// определение user функции
	// --------------------
	userStore := user.NewStore(s.db)
	userHandler := user.NewHandler(userStore)
	userHandler.RegisterRoutes(subrouter)

	// --------------------
	// определение site функции
	// --------------------
	siteStore := site.NewStore(s.db)
	siteHandler := site.NewHandler(siteStore, userStore)
	siteHandler.RegisterRoutes(subrouter)

	// ---------------------
	// Определение logs (site) функции
	// ---------------------
	logsStore := logs.NewStore(s.db)
	logsHandler := logs.NewHandler(logsStore, userStore, siteStore)
	logsHandler.RegisterRoutes(subrouter)

	// --------------------
	// Возращяем http ответ
	// --------------------
	log.Println("Listening on", s.addr)
	return http.ListenAndServe(s.addr, router)
}
