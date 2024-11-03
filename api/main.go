package main

import (
	"database/sql"
	"log"

	"github.com/Artymiik/logify/cmd/api"
	"github.com/Artymiik/logify/config"
	"github.com/Artymiik/logify/db"
	"github.com/Artymiik/logify/pkg/cron"
	"github.com/go-sql-driver/mysql"
)

// -------------------
// Начальная точка и запуск сервера
// -------------------
func main() {
	// ----------------------
	// Найстрока и подключение к бд
	// ----------------------
	db, err := db.NewMySQLStorage(mysql.Config{
		User:                 config.Envs.DBUser,
		Passwd:               config.Envs.DBPassword,
		Addr:                 config.Envs.DBAddress,
		DBName:               config.Envs.DBName,
		Net:                  "tcp",
		AllowNativePasswords: true,
		ParseTime:            true,
	})

	// Вывод ошибки с БД
	if err != nil {
		log.Fatal(err)
	}

	// Проверка открытия БД
	initStorage(db)

	// Запуск фоновой задачи
	// Уменьшение balance
	go cron.StartCron(db)

	// -------------------
	// Слушаем на порте 8080
	// -------------------
	server := api.NewAPIServer(":8080", db)

	// ---------------------
	// Обработчик ошибок server api
	// ---------------------
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}
}

// ------------------
// Проверка открытия БД
// ------------------
func initStorage(db *sql.DB) {
	// ----------------------
	// Если есть ошибка с БД, то вывести сообщениеdb
	// ----------------------
	err := db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	// -----------------
	// Если все ок и БД открылась
	// -----------------
	log.Println("DB: Successfully initialized!")
}
