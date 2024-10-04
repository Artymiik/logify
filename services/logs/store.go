package logs

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"os"

	"path/filepath"

	"github.com/sikozonpc/ecom/services/check"
	"github.com/sikozonpc/ecom/types"
	"github.com/sikozonpc/ecom/utils"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

// ------------------------
// ------------------------
// Переменные
// ------------------------
var payloadLog map[string]interface{} = map[string]interface{}{
	"": "",
}

// ------------------------
// ------------------------
// Функция сканирование массива данных
// ------------------------
func ScanRowIntoLogs(rows *sql.Rows) (*types.Log, error) {
	log := new(types.Log)

	err := rows.Scan(
		&log.ID,
		&log.SiteID,
		&log.Name,
		&log.UniqueClient,
		&log.Router,
		&log.Settings.Timestamp,
		&log.Settings.URL,
		&log.Settings.Methods,
		&log.Settings.StatusCode,
		&log.Settings.ResponseMessage,
		&log.Settings.Description,
		&log.Settings.IPAddress,
		&log.Settings.GPS,
		&log.Settings.UserName,
		&log.Settings.Email,
		&log.Settings.Cookie,
		&log.Settings.LocalStorage,
		&log.Settings.Session,
		&log.Settings.Authenticate,
		&log.Settings.Timestamp,
	)

	if err != nil {
		return nil, err
	}

	return log, nil
}

// ------------------------
// -----------------------
// Функция создания log + settings в БД
// -----------------------
func (s *Store) CreateDefaultLog(log types.Log) error {
	// запрос к БД на создания log
	_, err := s.db.Exec("insert into logs (siteId, name, uniqueClient, router) values(?, ?, ?, ?)", log.SiteID, log.Name, log.UniqueClient, log.Router)

	// обработка ошибки
	if err != nil {
		return err
	}

	return nil
}

// ------------------------
// -----------------------
// Функция вывода всех log по siteID
// -----------------------
func (s *Store) SelectLogs(id int) ([]types.Log, error) {
	// -----------------------
	// Выводим данные из БД
	// -----------------------
	rows, err := s.db.Query("select * from logs where siteId = ?", id)

	// обработка ошибки
	if err != nil {
		return nil, err
	}

	// Читаем данные
	// Создаем массив
	var logs []types.Log
	log := new(types.Log)

	// цикл для данных
	for rows.Next() {
		log, err = ScanRowIntoLogs(rows)
		if err != nil {
			return nil, err
		}

		logs = append(logs, *log)
	}

	// Проверка что есть логи
	if log.ID == 0 {
		return nil, fmt.Errorf("you don't have any active logs")
	}

	// Возращаем ответ
	return logs, nil
}

// ------------------------
// -----------------------
// Функция вывода количество log по userId и logName
// -----------------------
func (s *Store) CountLog(id int) (int, error) {
	// Переменная для хранения кол-во двнных
	var total int

	// Запрос на получение кол-во данных
	err := s.db.QueryRow("select count(*) as total from logs where siteId = ?", id).Scan(&total)
	if err != nil {
		return 0, fmt.Errorf("data reading error")
	}

	// Возвращаем результат
	return total, nil
}

// ------------------------
// -----------------------
// Функция для вывода настроек логов из БД
// -----------------------
func (s *Store) GetLog(uniqueClient string) (*types.Log, error) {
	// Выводим данные из БД
	rows, err := s.db.Query("select * from logs where uniqueClient = ?", uniqueClient)
	if err != nil {
		return nil, err
	}

	// цикл для данных
	settings := new(types.Log)
	for rows.Next() {
		settings, err = ScanRowIntoLogs(rows)
		if err != nil {
			return nil, err
		}
	}

	// Проверка лог есть
	if settings.ID == 0 {
		return nil, fmt.Errorf("log is not defined")
	}

	// Возвращаем результат
	return settings, nil
}

type LogData struct {
	Message string `json:"message"`
}

// ------------------------
// -----------------------
// Функция для создания файла для логов
// -----------------------
func (s *Store) CreateLogFile(name, email string, siteId int) error {
	// Шифруем имя файла
	encryptName, err := utils.Encrypt(name)
	if err != nil {
		return err
	}

	// Шифруем имя пользователя
	encryptUserData, err := utils.Encrypt(email)
	if err != nil {
		return err
	}

	// Получаем сколько всего логов созданно у сайта
	numberLog, err := s.CountLog(siteId)
	if err != nil {
		return err
	}

	// Указываем на папку и файл
	logName := fmt.Sprintf("log-%s[%s]-%v.json", encryptUserData, encryptName, numberLog+1)
	tempDir, err := filepath.Abs("temp/")
	if err != nil {
		return fmt.Errorf("error getting the absolute path")
	}

	// Создаем папку
	filePath := filepath.Join(tempDir, logName)

	// записываем данные в файл
	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("file creation error: %w", err)
	}
	file.Close()

	return nil
}

// -----------------------
// -----------------------
// Функция для создания данных для файла
// -----------------------
func (s *Store) ReturnsInsertPayload(uniqueClient, link string, log *types.Log) (*types.LogStruct, error) {
	// Получаем данные лога из БД
	settings, err := s.GetLog(uniqueClient)
	if err != nil {
		return nil, err
	}

	// --------------------
	// Переменные для файла
	// --------------------
	methods, err := check.GetMethods(link)
	if err != nil {
		return nil, err
	}

	// Заполняем данные для JSON
	JSON_LOG_DATA := &types.LogStruct{
		Title:     log.Name,
		TimeStamp: time.Now().Format("2006-01-02 15:04:05"),
		Client: types.LogDataClient{
			URL: func() string {
				if settings.Settings.URL {
					return link
				}
				return ""
			}(),
			Methods: func() string {
				if settings.Settings.Methods {
					return methods
				}
				return ""
			}(),
		},
		Server: types.LogDataServer{
			StatusCode: func() string {
				if payloadLog["StatusCode"] != nil {
					return payloadLog["StatusCode"].(string)
				}
				return ""
			}(),
			ResponseMessage: func() string {
				if payloadLog["ResponseMessage"] != nil {
					return payloadLog["ResponseMessage"].(string)
				}
				return ""
			}(),
		},
		Details: types.LogDataDetails{
			Description: func() string {
				if payloadLog["Description"] != nil {
					return payloadLog["Description"].(string)
				}
				return ""
			}(),
			IPAddress: func() string {
				if payloadLog["IPAddress"] != nil {
					return payloadLog["IPAddress"].(string)
				}
				return ""
			}(),
			GPS: func() string {
				if payloadLog["GPS"] != nil {
					return payloadLog["GPS"].(string)
				}
				return ""
			}(),
			UserName: func() string {
				if payloadLog["UserName"] != nil {
					return payloadLog["UserName"].(string)
				}
				return ""
			}(),
			Email: func() string {
				if payloadLog["Email"] != nil {
					return payloadLog["Email"].(string)
				}
				return ""
			}(),
			Cookie: func() string {
				if payloadLog["Cookie"] != nil {
					return payloadLog["Cookie"].(string)
				}
				return ""
			}(),
			Session: func() string {
				if payloadLog["Session"] != nil {
					return payloadLog["Session"].(string)
				}
				return ""
			}(),
			Authenticate: func() string {
				if payloadLog["Authenticate"] != nil {
					return payloadLog["Authenticate"].(string)
				}
				return ""
			}(),
		},
	}

	// Возвращяем результат
	return JSON_LOG_DATA, nil
}

// -----------------------
// -----------------------
// Функция для записи данных в log
// -----------------------
func (s *Store) InsertIntoFileLog(uniqueClient, deUniqueClient, link string, log *types.Log) error {
	// Получаем настройки лога из БД
	logData, err := s.ReturnsInsertPayload(uniqueClient, link, log)
	if err != nil {
		return err
	}

	// Добавляем отступы
	convertJSON, err := json.MarshalIndent(logData, "", "  ")
	if err != nil {
		return fmt.Errorf("json conversion error")
	}

	// Получаем сколько всего логов созданно у сайта
	count, err := s.CountLog(log.SiteID)
	if err != nil {
		return err
	}

	// Получаем данные из uniqueClient
	email, err := utils.Encrypt(strings.Split(deUniqueClient, "-")[0])
	if err != nil {
		return err
	}
	logName, err := utils.Encrypt(log.Name)
	if err != nil {
		return err
	}

	// Формируем имя файла
	fileName := fmt.Sprintf("temp/log-%s[%s]-%v.json", email, logName, count)

	// Открываем файл для записи
	file, err := os.OpenFile(fileName, os.O_APPEND|os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		return fmt.Errorf("error opening file")
	}
	defer file.Close()

	// Записываем данные в файл
	if _, err := file.WriteString(string(convertJSON) + ",\n"); err != nil {
		return fmt.Errorf("file recording error")
	}

	return nil
}

// -----------------------
// -----------------------
// Функция для записи данных в log
// -----------------------
func (s *Store) ValidatePayload(log *types.Log, payload *types.InsertLogPayload) error {
	var actionPayload types.ActionInsertPayload

	if log.Settings.StatusCode && payload.Action.StatusCode == "" || !log.Settings.StatusCode && payload.Action.StatusCode != "" || !utils.HasField(actionPayload, payload.Action.StatusCode) {
		return fmt.Errorf("error in transmitted data StatusCode")
	} else {
		payloadLog["StatusCode"] = payload.Action.StatusCode
	}

	if log.Settings.ResponseMessage && payload.Action.ResponseMessage == "" || !log.Settings.ResponseMessage && payload.Action.ResponseMessage != "" || !utils.HasField(actionPayload, payload.Action.ResponseMessage) {
		return fmt.Errorf("error in transmitted data ResponseMessage")
	} else {
		payloadLog["ResponseMessage"] = payload.Action.ResponseMessage
	}

	if log.Settings.IPAddress && payload.Action.IPAddress == "" || !log.Settings.IPAddress && payload.Action.IPAddress != "" || !utils.HasField(actionPayload, payload.Action.IPAddress) {
		return fmt.Errorf("error in transmitted data IPAddress")
	} else {
		payloadLog["IPAddress"] = payload.Action.IPAddress
	}

	if log.Settings.GPS && payload.Action.GPS == "" || !log.Settings.GPS && payload.Action.GPS != "" || !utils.HasField(actionPayload, payload.Action.GPS) {
		return fmt.Errorf("error in transmitted data GPS")
	} else {
		payloadLog["GPS"] = payload.Action.GPS
	}

	if log.Settings.UserName && payload.Action.UserName == "" || !log.Settings.UserName && payload.Action.UserName != "" || !utils.HasField(actionPayload, payload.Action.UserName) {
		return fmt.Errorf("error in transmitted data UserName")
	} else {
		payloadLog["UserName"] = payload.Action.UserName
	}

	if log.Settings.Email && payload.Action.Email == "" || !log.Settings.Email && payload.Action.Email != "" || !utils.HasField(actionPayload, payload.Action.Email) {
		return fmt.Errorf("error in transmitted data Email")
	} else {
		payloadLog["Email"] = payload.Action.Email
	}

	if log.Settings.Cookie && payload.Action.Cookie == "" || !log.Settings.Cookie && payload.Action.Cookie != "" || !utils.HasField(actionPayload, payload.Action.Cookie) {
		return fmt.Errorf("error in transmitted data Cookie")
	} else {
		payloadLog["Cookie"] = payload.Action.Cookie
	}

	if log.Settings.Session && payload.Action.Session == "" || !log.Settings.Session && payload.Action.Session != "" || !utils.HasField(actionPayload, payload.Action.Session) {
		return fmt.Errorf("error in transmitted data Session")
	} else {
		payloadLog["Session"] = payload.Action.Session
	}

	if log.Settings.Authenticate && payload.Action.Authenticate == "" || !log.Settings.Authenticate && payload.Action.Authenticate != "" || !utils.HasField(actionPayload, payload.Action.Authenticate) {
		return fmt.Errorf("error in transmitted data Authenticate")
	} else {
		payloadLog["Authenticate"] = payload.Action.Authenticate
	}

	return nil
}
