package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// ----------------
// Определение структуры env
// ----------------
type Config struct {
	// database
	PublicHost string
	Port       string
	DBUser     string
	DBPassword string
	DBAddress  string
	DBName     string
	// S3 storage
	ACCESS_KEY string
	SECRET_KEY string
	// jwt
	JWTExpirationInSeconds int64
	JWTSecret              string
	// hashing
	SUPER_SECRET_KEY string
	IV               string
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
	return Config{
		// database
		PublicHost: getEnv("PUBLIC_HOST", "autorack.proxy.rlwy.net"),                                       // mysql.railway.internal  http://localhost
		Port:       getEnv("PORT", "25792"),                                                          // 3306   8080
		DBUser:     getEnv("DBU_USER", "root"),                                                      // root  root
		DBPassword: getEnv("DB_PASSWORD", "mIRdwqeeczlTjSJYylZhkLKISfNbfgqm"),                                               // cBdebQpIKwdZjjuwGoeigaJaIvnZjCtJ   password
		DBAddress:  fmt.Sprintf("%s:%s", getEnv("DB_HOST", "autorack.proxy.rlwy.net"), getEnv("DB_PORT", "25792")), // 127.0.0.1  3306
		DBName:     getEnv("DB_NAME", "railway"),                                                     // railway   logify
		// S3 storage
		ACCESS_KEY: getEnv("ACCESS_KEY", "7473cb7bcdeb473fbd4c6d9d628ac976"),
		SECRET_KEY: getEnv("SECRET_KEY", "2950ff80ecbc478c8adbe0054f383882"),
		// jwt
		JWTExpirationInSeconds: getEnvAsInt("JWT_EXP", 3600*24*7),
		JWTSecret:              getEnv("JWT_SECRET", "_logify_-secret-_token_-!2024!-envs."),
		// hashing
		SUPER_SECRET_KEY: getEnv("SUPER_SECRET_KEY", "abc&1*~#^2^#s0^=)^^7%b34"),
		IV:               getEnv("IV", "123456789012"),
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

// ------------------
// Читаем .env файл для INT
// ------------------
func getEnvAsInt(key string, fallback int64) int64 {
	if value, ok := os.LookupEnv(key); ok {
		i, err := strconv.ParseInt(value, 10, 64)
		if err != nil {
			return fallback
		}

		return i
	}

	return fallback
}
