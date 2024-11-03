package pkg

import (
	"github.com/Artymiik/logify/types"
)

// -----------------------
// -----------------------
// Функция для генерации кода для пользователя
// -----------------------
func GenerateCode(uniqueClient string, settings *types.Log) string {
	// инициализация строки
	logConnect := "log.insert(connect, {"

	// Проверка settings данных на true || false
	// Формирование строки
	if settings.Settings.StatusCode {
		logConnect += "\n statusCode: 200"
	} else {
		logConnect += ""
	}

	if settings.Settings.ResponseMessage {
		logConnect += ",\n responseMessage: 'This is server response'"
	} else {
		logConnect += ""
	}

	if settings.Settings.Description {
		logConnect += ",\n description: 'This is a description'"
	} else {
		logConnect += ""
	}

	if settings.Settings.IPAddress {
		logConnect += ",\n ip_address: ::getIPAddress()"
	} else {
		logConnect += ""
	}

	if settings.Settings.GPS {
		logConnect += ",\n gps: ::getGPS()"
	} else {
		logConnect += ""
	}

	if settings.Settings.UserName {
		logConnect += ",\n username: 'UserName'"
	} else {
		logConnect += ""
	}

	if settings.Settings.Email {
		logConnect += ",\n email: 'test@test.com'"
	} else {
		logConnect += ""
	}

	if settings.Settings.Cookie {
		logConnect += ",\n cookie: 'Hello, Cookie!'"
	} else {
		logConnect += ""
	}

	if settings.Settings.LocalStorage {
		logConnect += ",\n localStorage: 'Hello, LocalStorage!'"
	} else {
		logConnect += ""
	}

	if settings.Settings.Session {
		logConnect += ",\n session: 'Hello, Session!'"
	} else {
		logConnect += ""
	}

	if settings.Settings.Authenticate {
		logConnect += ",\n authenticate: 'This is user auth'"
	} else {
		logConnect += ""
	}

	logConnect += "\n})"

	// Возвращаем строку
	return logConnect
}
