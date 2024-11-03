package api

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/Artymiik/logify/services/logs"
	"github.com/Artymiik/logify/services/site"
	"github.com/Artymiik/logify/services/transaction"
	"github.com/Artymiik/logify/services/user"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
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
	// транзакции transaction функции
	transactionStore := transaction.NewStore(s.db)
	// logs (site) функции
	logsHandler := logs.NewHandler(logsStore, userStore, siteStore, transactionStore)
	logsHandler.RegisterRoutes(subrouter)

	// ---------------------
	// Определение transaction функции
	// ---------------------
	transactionHandler := transaction.NewHandler(transactionStore, logsStore, userStore, siteStore)
	transactionHandler.RegisterRoutes(subrouter)

	// -------------------
	// подключаем CORS
	// -------------------
	origins := handlers.AllowedOrigins([]string{"*"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	headers := handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"})

	// --------------------
	// Возращяем http ответ
	// --------------------
	log.Println("Listening on", s.addr)
	return http.ListenAndServe(s.addr, handlers.CORS(origins, methods, headers)(router))
}
