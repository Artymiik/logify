package auth

import (
  "golang.org/x/crypto/bcrypt"
)

// ----------------------
// Функция хеширование пароля
// ----------------------
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}
