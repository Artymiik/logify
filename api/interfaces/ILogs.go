package interfaces

import (
	"io"

	"github.com/Artymiik/logify/types"
)

type ILogs interface {
	// ------------------------
	// -----------------------
	// Функция создания log в БД
	// -----------------------
	CreateDefaultLog(category string, log types.Log) error

	// ------------------------
	// -----------------------
	// Функция для получения лога по name
	// -----------------------
	GetLogByName(name string) (*types.Log, error)

	// ------------------------------------------
	// ------------------------------------------
	// Функция вывода userID по uniqueClient из БД
	// ------------------------------------------
	GetUserIdByUniqueClient(uniqueClient string) (int, error)

	// ------------------------
	// -----------------------
	// Функция вывода всех log по siteID
	// -----------------------
	SelectLogs(id int) ([]types.LogQuery, error)

	// ------------------------
	// -----------------------
	// Функция создания файла для логов
	// -----------------------
	CreateLogFile(name, string string, siteId int) error

	// ------------------------
	// -----------------------
	// Функция для вывода лога из БД по uniqueClient
	// -----------------------
	GetLog(uniqueClient string) (*types.Log, error)

	// ------------------------
	// -----------------------
	// Функция обновления настроек лога
	// -----------------------
	UpdateSettingsLog(settings *types.SettingsLogPayload, logName string) error

	// -----------------------
	// -----------------------
	// Функция записи данных в файл log
	// -----------------------
	InsertIntoFileLog(uniqueClient, deUniqueClient, link string, log *types.Log) error

	// -----------------------
	// -----------------------
	// Валидация настроек лога +
	// сохранение в переменную настроек
	// -----------------------
	ValidatePayload(log *types.Log, payload *types.InsertLogPayload) error

	// -----------------------
	// -----------------------
	// Функция для генерации кода для пользователя
	// -----------------------
	GenerateCode(uniqueClient string) (string, error)

	// -----------------------
	// -----------------------
	// Получение детальных данных лога
	// -----------------------
	DetailsLog(email, logName string) (string, error)

	// -----------------------
	// -----------------------
	// Удаление лога
	// -----------------------
	DeleteLogByFileName(logName, fileName string) error

	// ----------------------
	// ----------------------
	// Скачивание файла из S3
	// ----------------------
	DownloadFileLog(email, logName string) (io.ReadCloser, error)
}
