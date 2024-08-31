package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// ----------------
// Определение структуры env
// ----------------
type Config struct {
	PublicHost string
	Port       string
	DBUser     string
	DBPassword string
	DBAddress  string
	DBName     string
}

var Envs = initConfig()

// ---------------------
// Функция для переменных
// ---------------------
func initConfig() Config {
	godotenv.Load()

	// ------------------
	// Данные для работы с БД
	// ------------------
	return Config {
		PublicHost: getEnv("PUBLIC_HOST", "http://localhost"),
		Port: getEnv("PORT", "8080"),
		DBUser: getEnv("DBU_USER", "root"),
		DBPassword: getEnv("DB_PASSWORD", "password"),
		DBAddress: fmt.Sprintf("%s:%s", getEnv("DB_HOST", "127.0.0.1"), getEnv("DB_PORT", "3306")),
		DBName: getEnv("DB_NAME", "logify"),
	}
}

// ------------------
// Читаем .env файл
// ------------------
func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}

	return fallback
}
