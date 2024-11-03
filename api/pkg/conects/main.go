package conects

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/Artymiik/logify/types"
	"github.com/Artymiik/logify/utils"
)

// --------------------------
// Функция генерации конекта
// --------------------------
func GenerateConect(data *types.GenerateConect) (string, error) {
	// balance | count(logs по userID) |
	// count(кол-во часов всех логов по userID  time.Now() - createdAt) |
	// количество всех запесей в log.json |
	// count(sites по userID)

	// инифиализация переменных
	var str1 string
	var str2 string
	var str3 string

	// шифруем данные для str1
	str1, err := utils.Encrypt(fmt.Sprintf("%f;%d", data.Balance, data.CountLogs))
	if err != nil {
		return "", err
	}

	// шифруем данные для str2
	str2, err = utils.Encrypt(data.TimeLogs)
	if err != nil {
		return "", err
	}

	// шифруем данные для str3
	str3, err = utils.Encrypt(fmt.Sprintf("%d;%d", data.CountLogFieldsFile, data.CountSites))
	if err != nil {
		return "", err
	}

	// создаем конект
	conect := fmt.Sprintf("%s-%s-%s", str1, str2, str3)

	// возвращяем результат
	return conect, nil
}

// --------------------------
// Функция расшифрования конекта
// --------------------------
func ReturnsDataConect(conect string) (*types.GenerateConect, error) {
	// получаем строки из -
	parts := strings.Split(conect, "-")

	// создаем массив для хранения переменных
	var varParts []string
	for _, part := range parts {
		// расшифровываем каждую часть и добавляем в массив
		decryptConectPart, err := utils.Decrypt(part)
		if err != nil {
			return nil, err
		}

		varParts = append(varParts, strings.Split(decryptConectPart, ";")...)
	}

	// создаем и возвращаем структуру с данными конекта
	return &types.GenerateConect{
		Balance: func() float64 {
			if balance, err := strconv.ParseFloat(varParts[0], 64); err != nil {
				return -1
			} else {
				return balance
			}
		}(),
		CountLogs: func() int {
			if countLogs, err := strconv.Atoi(varParts[1]); err != nil {
				return -1
			} else {
				return int(countLogs)
			}
		}(),
		TimeLogs: varParts[2],
		CountLogFieldsFile: func() int {
			if countFields, err := strconv.Atoi(varParts[3]); err != nil {
				return -1
			} else {
				return countFields
			}
		}(),
		CountSites: func() int {
			if countSites, err := strconv.Atoi(varParts[4]); err != nil {
				return -1
			} else {
				return countSites
			}
		}(),
	}, nil
}
