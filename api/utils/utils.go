package utils

import (
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"

	"crypto/aes"
	"crypto/cipher"

	"github.com/Artymiik/logify/config"
	"github.com/Artymiik/logify/types"
	"github.com/go-playground/validator/v10"
)

// -----------------
// Переменная для валидации данных
// -----------------
var Validate = validator.New()

var key string = config.Envs.SUPER_SECRET_KEY
var iv string = config.Envs.IV

// ------------------------------
// Проверка и декодирование данных от user
// ------------------------------
func ParseJSON(r *http.Request, payload any) error {
	if r.Body == nil {
		return fmt.Errorf("missing request body")
	}

	return json.NewDecoder(r.Body).Decode(payload)
}

// ------------------------
// Функция ответа пользователю
// ------------------------
func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)

	return json.NewEncoder(w).Encode(v)
}

// -------------------
// Функция обработки ошибок
// -------------------
func WriteError(w http.ResponseWriter, status int, err error) {
	WriteJSON(w, status, map[string]string{"error": err.Error()})
}

// -----------------------
// Проверка на существование данных в struct
// -----------------------
func HasField(v types.ActionInsertPayload, field string) bool {
	t := reflect.TypeOf(v)

	for i := 0; i < t.NumField(); i++ {
		if t.Field(i).Name == field {
			return true
		}
	}

	return false
}

// -----------------------
// Шифрование (encrypt)
// -----------------------

func Encrypt(plaintext string) (string, error) {
	// Создание блока шифрования AES
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", fmt.Errorf("error creating the encryption block")
	}

	// Создание блочного режима шифрования CBC
	gsm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("error creating block encryption mode")
	}

	// Шифрование данных
	ciphertext := gsm.Seal(nil, []byte(iv), []byte(plaintext), nil)

	// Кодирование зашифрованных данных в base64 для удобства
	encodedCiphertext := base64.StdEncoding.EncodeToString(ciphertext)
	return encodedCiphertext, nil
}

// -----------------------
// Де-шифрование (decrypt)
// -----------------------

func Decrypt(encodedCiphertext string) (string, error) {
	// Декодирование зашифрованных данных из base64
	ciphertext, err := base64.StdEncoding.DecodeString(encodedCiphertext)
	if err != nil {
		return "", fmt.Errorf("error decoding encrypted data")
	}

	// Создание блока шифрования AES
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", fmt.Errorf("error creating the encryption block")
	}

	// Создание блочного режима шифрования CBC
	gsm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("error creating block encryption mode")
	}

	// Расшифровка данных
	plaintext, err := gsm.Open(nil, []byte(iv), ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("data decryption error")
	}

	return string(plaintext), nil
}

// -----------------------
// Шифрование в байтовом виде
// -----------------------

func UniqueLog(plaintext []byte) ([]byte, error) {
	// Создание блока шифрования AES
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return nil, fmt.Errorf("error creating the encryption block")
	}

	// Создание блочного режима шифрования CBC
	gsm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, fmt.Errorf("error creating block encryption mode")
	}

	// Шифрование данных
	ciphertext := gsm.Seal(nil, []byte(iv), []byte(plaintext), nil)

	return []byte(hex.EncodeToString(ciphertext)), nil
}

// -----------------------
// Де-шифрование в байтовом виде
// -----------------------

func DeUniqueLog(ciphertext []byte) (string, error) {

	// Создание блока шифрования AES
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", fmt.Errorf("error creating the encryption block")
	}

	// Создание блочного режима шифрования CBC
	gsm, err := cipher.NewGCM(block)
	if err != nil {
		return "", fmt.Errorf("error creating block encryption mode")
	}

	// Расшифровка данных
	plaintext, err := gsm.Open(nil, []byte(iv), ciphertext, nil)
	if err != nil {
		return "", fmt.Errorf("error decrypting the ciphertext")
	}

	return string(plaintext), nil
}
