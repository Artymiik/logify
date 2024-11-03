package logs

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"reflect"
	"sync"
	"time"

	"github.com/Artymiik/logify/pkg"
	"github.com/Artymiik/logify/pkg/files"
	"github.com/Artymiik/logify/types"
	"github.com/Artymiik/logify/utils"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
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
		&log.DetailsLogId,
		&log.SiteID,
		&log.UserID,
		&log.Name,
		&log.UniqueClient,
		&log.Router,
		&log.Status,
		&log.CreatedAt,
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
func (s *Store) CreateDefaultLog(category string, log types.Log) error {
	var detail_log_id int

	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	stmt, err := s.db.PrepareContext(ctx, "insert into logs (details_log_id, siteId, userId, name, uniqueClient, router, createdAt, methods, responseMessage, ipAddress, gps, username, email, session, authenticate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
	if err != nil {
		return err
	}
	defer stmt.Close()

	// запрос к БД на создания details_log
	_, err = s.db.ExecContext(ctx, "insert into details_log () VALUES ()")
	if err != nil {
		return err
	}
	// вывод id последней записи
	err = s.db.QueryRowContext(ctx, "select MAX(id) from details_log").Scan(&detail_log_id)
	if err != nil {
		return err
	}

	if category == "Authenticate" {
		// "insert into logs (details_log_id, siteId, userId, name, uniqueClient, router, createdAt, username, email, session, authenticate) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05"), true, true, true, true

		// запрос к БД на создания log
		_, err := stmt.Exec(detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05"), false, false, false, false, true, true, true, true)
		// обработка ошибки
		if err != nil {
			return err
		}

		return nil
	} else if category == "Safety" {
		// "insert into logs (details_log_id, siteId, userId, name, uniqueClient, router, createdAt, responseMessage, methods, ipAddress, gps, authenticate, email) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05"), false, false, true, true, true, true

		// запрос к БД на создания log
		_, err := stmt.Exec(detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05"), false, false, true, true, true, false, false, true)
		// обработка ошибки
		if err != nil {
			return err
		}

		return nil
	}
	// "insert into logs (details_log_id, siteId, userId, name, uniqueClient, router, createdAt) values(?, ?, ?, ?, ?, ?, ?)", detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05")

	// запрос к БД на создания log
	_, err = stmt.Exec(detail_log_id, log.SiteID, log.UserID, log.Name, log.UniqueClient, log.Router, time.Now().Format("2006-01-02 15:04:05"), true, true, false, false, false, false, false, false)
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
func (s *Store) SelectLogs(id int) ([]types.LogQuery, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select id, name, uniqueClient, status, createdAt from logs where siteId = ?", id)

	// обработка ошибки
	if err != nil {
		return nil, err
	}

	// Читаем данные
	// Создаем массив
	var logs []types.LogQuery

	// цикл для данных
	for rows.Next() {
		var log types.LogQuery
		err := rows.Scan(&log.ID, &log.Name, &log.UniqueClient, &log.Status, &log.CreatedAt)
		if err != nil {
			return nil, err
		}

		logs = append(logs, log)
	}

	// Проверка что есть логи
	if len(logs) == 0 {
		return nil, fmt.Errorf("you don't have any active logs")
	}

	// Возращаем ответ
	return logs, nil
}

// -----------------------
// Вывод логов по userID
// -----------------------
func (s *Store) GetLogsByUserID(userID int) ([]types.Log, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select id, status from logs where userId = ?", userID)
	if err != nil {
		return nil, err
	}

	// Читаем данные
	// Создаем массив
	var logs []types.Log

	// цикл по данным logs
	for rows.Next() {
		var log types.Log
		err := rows.Scan(&log.ID, &log.Status)

		if err != nil {
			return nil, err
		}

		// добовляем в массив
		logs = append(logs, log)
	}

	if len(logs) == 0 {
		return nil, fmt.Errorf("the log was not found")
	}

	return logs, nil
}

// -------------------------------------
// -------------------------------------
// Функция определенного лога по logName
// -------------------------------------
func (s *Store) GetLogByName(name string) (*types.Log, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from logs where name = ?", name)

	// обработка ошибки
	if err != nil {
		return nil, err
	}

	// Читаем данные
	log := new(types.Log)

	// цикл для данных
	for rows.Next() {
		log, err = ScanRowIntoLogs(rows)
		if err != nil {
			return nil, err
		}
	}

	// Проверка что есть логи
	if log.ID == 0 {
		return nil, fmt.Errorf("the log was not found")
	}

	// Возращаем ответ
	return log, nil
}

// -----------------------------------------------
// -----------------------------------------------
// Функция вывода количество log по userId и logName
// -----------------------------------------------
func (s *Store) CountLog(id int) (int, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Переменная для хранения кол-во двнных
	var total int

	// Запрос на получение кол-во данных
	err := s.db.QueryRowContext(ctx, "select count(*) as total from logs where siteId = ?", id).Scan(&total)
	if err != nil {
		return 0, fmt.Errorf("data reading error")
	}

	// Возвращаем результат
	return total, nil
}

// ------------------------------------------
// ------------------------------------------
// Функция вывода userID по uniqueClient из БД
// ------------------------------------------
func (s *Store) GetUserIdByUniqueClient(uniqueClient string) (int, error) {
	// Переменная для хранения userId из БД
	var userID int

	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Запрос на получение userId по uniqueClient из БД
	err := s.db.QueryRowContext(ctx, "select userId from logs where uniqueClient = ?", uniqueClient).Scan(&userID)
	if err != nil {
		return -1, err
	}

	// Проверка наличия userId в БД
	if userID <= 0 {
		return -1, err
	}

	// Возвращаем userId из БД
	return userID, nil
}

// ------------------------
// -----------------------
// Функция для вывода настроек логов из БД
// -----------------------
func (s *Store) GetLog(uniqueClient string) (*types.Log, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from logs where uniqueClient = ?", uniqueClient)
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

// ------------------------
// -----------------------
// Функция обновления настроек лога
// -----------------------
func (s *Store) UpdateSettingsLog(settings *types.SettingsLogPayload, logName string) error {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Запрос на изменение настроек лога
	_, err := s.db.ExecContext(ctx, `
	update logs set
	url = ?, methods = ?,
	statusCode = ?, responseMessage = ?,
	description = ?, ipAddress = ?,
	gps = ?, username = ?,
	email = ?, cookie = ?,
	localStorage = ?, session = ?,
	authenticate = ? where name = ?`,
		settings.Settings.URL, settings.Settings.Methods, settings.Settings.StatusCode,
		settings.Settings.ResponseMessage, settings.Settings.Description, settings.Settings.IPAddress,
		settings.Settings.GPS, settings.Settings.UserName, settings.Settings.Email, settings.Settings.Cookie,
		settings.Settings.LocalStorage, settings.Settings.Session, settings.Settings.Authenticate, logName)

	// обработка ошибки
	if err != nil {
		return fmt.Errorf("error in log settings")
	}

	return nil
}

type LogData struct {
	Message string `json:"message"`
}

// -----------------------------------
// -----------------------------------
// Функция для создания файла для логов
// -----------------------------------
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

	// Указываем на папку и файл
	logName := fmt.Sprintf("log-%s[%s].json", encryptUserData, encryptName)

	// ----------------------
	// создания файла в S3 storage
	// Deploy verion
	// ----------------------
	client, err := files.CreateS3Client()
	if err != nil {
		return err
	}

	// создания пустого файла на S3
	_, err = client.PutObject(context.Background(), &s3.PutObjectInput{
		Bucket: aws.String("logify-storage"),
		Key:    aws.String(logName),
		Body:   bytes.NewReader([]byte{}),
	})

	if err != nil {
		return fmt.Errorf("error creating an log file")
	}

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
	// methods, err := pkg.GetMethods(link)
	// if err != nil {
	// 	return nil, err
	// }

	// Заполняем данные для JSON
	JSON_LOG_DATA := &types.LogStruct{
		// Title
		Title: log.Name,
		// Timestamp
		TimeStamp: time.Now().Format("2006-01-02 15:04:05"),
		// Client Part
		Client: types.LogDataClient{
			// URL
			URL: func() string {
				if settings.Settings.URL {
					return link
				}
				return ""
			}(),
			// Methods
			Methods: func() string {
				if settings.Settings.Methods {
					return "POST"
				}
				return ""
			}(),
		},
		// Server Part
		Server: types.LogDataServer{
			// StatusCode
			StatusCode: func() string {
				if payloadLog["StatusCode"] != nil {
					return payloadLog["StatusCode"].(string)
				}
				return ""
			}(),
			// ResponseMessage
			ResponseMessage: func() string {
				if payloadLog["ResponseMessage"] != nil {
					return payloadLog["ResponseMessage"].(string)
				}
				return ""
			}(),
		},
		// Details Part
		Details: types.LogDataDetails{
			// Description
			Description: func() string {
				if payloadLog["Description"] != nil {
					return payloadLog["Description"].(string)
				}
				return ""
			}(),
			// IPAddress
			IPAddress: func() string {
				if payloadLog["IPAddress"] != nil {
					return payloadLog["IPAddress"].(string)
				}
				return ""
			}(),
			// GPS
			GPS: func() string {
				if payloadLog["GPS"] != nil {
					return payloadLog["GPS"].(string)
				}
				return ""
			}(),
			// UserName
			UserName: func() string {
				if payloadLog["UserName"] != nil {
					return payloadLog["UserName"].(string)
				}
				return ""
			}(),
			// Email
			Email: func() string {
				if payloadLog["Email"] != nil {
					return payloadLog["Email"].(string)
				}
				return ""
			}(),
			// Cookie
			Cookie: func() string {
				if payloadLog["Cookie"] != nil {
					return payloadLog["Cookie"].(string)
				}
				return ""
			}(),
			// LocalStorage
			LocalStorage: func() string {
				if payloadLog["LocalStorage"] != nil {
					return payloadLog["LocalStorage"].(string)
				}
				return ""
			}(),
			// Session
			Session: func() string {
				if payloadLog["Session"] != nil {
					return payloadLog["Session"].(string)
				}
				return ""
			}(),
			// Authenticate
			Authenticate: func() string {
				if payloadLog["Authenticate"] != nil {
					return payloadLog["Authenticate"].(string)
				}
				return ""
			}(),
		},
	}

	// Возвращаем результат
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

	// Формируем имя файла
	fileName, err := files.GetFileName(deUniqueClient, log.Name)
	if err != nil {
		return err
	}

	// Создание клиента S3
	client, err := files.CreateS3Client()
	if err != nil {
		return err
	}

	// Проверка на существование файла в S3
	_, err = client.HeadObject(context.Background(), &s3.HeadObjectInput{
		Bucket: aws.String("logify-storage"),
		Key:    aws.String(fileName),
	})

	if err == nil {
		// файл существует
		convertJSON, err := files.ReadDataInS3(client, "logify-storage", fileName, logData)
		if err != nil {
			return err
		}

		// Загружаем обновленные данные в S3
		if err := files.UploadDataToS3(client, "logify-storage", fileName, convertJSON); err != nil {
			return err
		}

		return nil
	}

	return fmt.Errorf("the log file was not found or does not exist")
}

// -----------------------
// -----------------------
// Валидация настроек лога +
// сохранение в переменную настроек
// -----------------------
func (s *Store) ValidatePayload(log *types.Log, payload *types.InsertLogPayload) error {
	// создание канала для ошибок
	errors := make(chan error)

	// массив строк настроек как в БД
	fields := []string{"StatusCode", "ResponseMessage", "IPAddress", "GPS", "UserName", "Email", "Cookie", "LocalStorage", "Session", "Authenticate"}
	// массив строк для возврата значений
	returnsFields := []string{"statusCode", "responseMessage", "ip_address", "gps", "userName", "email", "cookie", "localStorage", "session", "authenticate"}

	// Создаем WaitGroup и устанавливаем счетчик горутин
	var wg sync.WaitGroup
	wg.Add(len(fields))

	// Объявление мьютекса
	var mu sync.Mutex

	// цикл по данным settings
	for i := 0; i < len(fields); i++ {
		// Запускаем горутину для каждого поля settings и payload.Action
		go func(field string, payloadField string) {
			// уменьшение счетчика WaitGroup на -1
			defer wg.Done()

			// Получаем доступ к полям settings и payload.Action
			settings := reflect.ValueOf(log.Settings).FieldByName(field)
			actionField := reflect.ValueOf(payload.Args).FieldByName(field)

			// Проверяем наличие поля в payload.Action
			if actionField.IsValid() {
				// Проверяем настройки на соответствие полю payload.Action
				if settings.Bool() && (actionField.IsZero() || actionField.Interface() == nil) {
					// Если поле пустое или nil, возвращаем ошибку
					errors <- fmt.Errorf("[not/is used]:%s", payloadField)
				} else {
					// Записываем значение поля в payloadLog, если настройка включена в settings
					if !settings.Bool() && !actionField.IsZero() {
						errors <- fmt.Errorf("[not/is used]:%s", payloadField)
					} else {
						// Блокировка и разблокировка мьютекса
						mu.Lock()
						defer mu.Unlock()
						// записываем в map payloadLog
						payloadLog[field] = actionField.Interface()
					}
				}
			} else {
				if settings.Bool() {
					errors <- fmt.Errorf("[not/is used]:%s", payloadField)
				}
			}
		}(fields[i], returnsFields[i])
	}

	// Закрытие канала после завершения работы горутин
	go func() {
		wg.Wait()
		close(errors)
	}()

	// Собираем ошибки из горутин
	for err := range errors {
		if err != nil {
			return err
		}
	}

	return nil
}

// -----------------------
// -----------------------
// Функция для генерации кода для пользователя
// -----------------------
func (s *Store) GenerateCode(uniqueClient string) (string, error) {
	// Получения настроек лога
	settings, err := s.GetLog(uniqueClient)
	if err != nil {
		return "", err
	}

	// генерируем строку для клиента
	var code string = pkg.GenerateCode(uniqueClient, settings)

	// возвращяем результат
	return code, nil
}

// -----------------------------------
// -----------------------------------
// Функция для вывода содержимого лога
// -----------------------------------
func extractValues(entryMap map[string]interface{}) map[string]interface{} {
	var newEntry map[string]interface{} = map[string]interface{}{}

	// устанавливаем в переменные значения из файла
	// Title
	if title, ok := entryMap["title"].(string); ok && title != "" {
		newEntry["title"] = title
	}
	// Timestamp
	if timestamp, ok := entryMap["timestamp"].(string); ok && timestamp != "" {
		newEntry["timestamp"] = timestamp
	}
	// URL
	if url, ok := entryMap["client"].(map[string]interface{})["url"].(string); ok && url != "" {
		newEntry["url"] = url
	}
	// Methods
	if methods, ok := entryMap["client"].(map[string]interface{})["methods"].(string); ok && methods != "" {
		newEntry["methods"] = methods
	}
	// StatusCode
	if statusCode, ok := entryMap["server"].(map[string]interface{})["status"].(string); ok && statusCode != "" {
		newEntry["statusCode"] = statusCode
	}
	// ResponseMessage
	if responseMessage, ok := entryMap["server"].(map[string]interface{})["response"].(string); ok && responseMessage != "" {
		newEntry["responseMessage"] = responseMessage
	}
	// Description
	if description, ok := entryMap["details"].(map[string]interface{})["description"].(string); ok && description != "" {
		newEntry["description"] = description
	}
	// IPAddress
	if ip_address, ok := entryMap["details"].(map[string]interface{})["ip_address"].(string); ok && ip_address != "" {
		newEntry["ip_address"] = ip_address
	}
	// GPS
	if gps, ok := entryMap["details"].(map[string]interface{})["gps"].(string); ok && gps != "" {
		newEntry["gps"] = gps
	}
	// UserName
	if username, ok := entryMap["details"].(map[string]interface{})["userName"].(string); ok && username != "" {
		newEntry["userName"] = username
	}
	// Email
	if email, ok := entryMap["details"].(map[string]interface{})["email"].(string); ok && email != "" {
		newEntry["email"] = email
	}
	// Cookie
	if cookie, ok := entryMap["details"].(map[string]interface{})["cookie"].(string); ok && cookie != "" {
		newEntry["cookie"] = cookie
	}
	// localStorage
	if localStorage, ok := entryMap["details"].(map[string]interface{})["localStorage"].(string); ok && localStorage != "" {
		newEntry["localStorage"] = localStorage
	}
	// Session
	if session, ok := entryMap["details"].(map[string]interface{})["session"].(string); ok && session != "" {
		newEntry["session"] = session
	}
	// Authenticate
	if authenticate, ok := entryMap["details"].(map[string]interface{})["authenticate"].(string); ok && authenticate != "" {
		newEntry["authenticate"] = authenticate
	}

	return newEntry
}

// Функция для вывода содержимого лога
func (s *Store) DetailsLog(email, logName string) (string, error) {
	// массив для хранения структурированных данных
	detailsLog := make([]map[string]interface{}, 0)

	// хешируем email для файла
	emailF, err := utils.Encrypt(email)
	if err != nil {
		return "", err
	}

	// хешируем log name для файла
	logNameF, err := utils.Encrypt(logName)
	if err != nil {
		return "", err
	}

	// Формируем имя файла
	fileName := fmt.Sprintf("log-%s[%s].json", emailF, logNameF)

	// создаем клиента для S3 storage
	client, err := files.CreateS3Client()
	if err != nil {
		return "", err
	}

	// получаем данные из файла log
	logData, err := files.ReadLogsFromS3(client, "logify-storage", fileName)
	if err != nil {
		return "", err
	}

	// Создаем канал для передачи результатов обработки
	resultsChan := make(chan map[string]interface{})

	// Создаем WaitGroup для синхронизации горутин
	var wg sync.WaitGroup
	wg.Add(len(logData))

	// пробегаемся по данным из файла
	for _, v := range logData {
		// Запускаем горутину
		go func(v map[string]interface{}) {
			// уменьшение счетчика WaitGroup на -1
			defer wg.Done()
			// Обработка записи
			newEntry := extractValues(v)
			// добовляем результат в канал
			resultsChan <- newEntry
		}(v)
	}

	// Ожидаем завершения всех горутин
	go func() {
		wg.Wait()
		// закрытие канала
		close(resultsChan)
	}()

	// Получаем результаты из канала
	for entry := range resultsChan {
		detailsLog = append(detailsLog, entry)
	}

	// кодируем в JSON и возвращаем ответ в router
	response, err := json.MarshalIndent(detailsLog, "", " ")
	if err != nil {
		return "", fmt.Errorf("json encoding error")
	}

	// возвращяем ответ в router
	return string(response), nil
}

// -------------------------
// -------------------------
// Функция для удаления лога
// -------------------------
func (s *Store) DeleteLogByFileName(logName, fileName string) error {
	// удаление лога из БД
	_, err := s.db.Exec("delete from logs where name = ?", logName)
	if err != nil {
		return err
	}

	// инициализация клиента
	client, err := files.CreateS3Client()
	if err != nil {
		return err
	}

	// установка параметров s3
	params := &s3.DeleteObjectInput{
		Bucket: aws.String("logify-storage"),
		Key:    aws.String(fileName),
	}

	// удаление обьекта лог из s3
	_, err = client.DeleteObject(context.Background(), params)
	if err != nil {
		return err
	}

	return nil
}

// ----------------------
// ----------------------
// Скачивание файла из S3
// ----------------------
func (s *Store) DownloadFileLog(email, logName string) (io.ReadCloser, error) {
	// Шифруем имя файла
	encryptName, err := utils.Encrypt(logName)
	if err != nil {
		return nil, err
	}

	// Шифруем email пользователя
	encryptUserData, err := utils.Encrypt(email)
	if err != nil {
		return nil, err
	}

	// Формируем имя файла
	fileName := fmt.Sprintf("log-%s[%s].json", encryptUserData, encryptName)

	// создаем клиента S3
	client, err := files.CreateS3Client()
	if err != nil {
		return nil, err
	}

	// определите параметры входного файла S3
	// получите объект S3
	response, err := client.GetObject(context.Background(), &s3.GetObjectInput{
		Bucket: aws.String("logify-storage"),
		Key:    aws.String(fileName),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to get object %s", err)
	}

	// закрытие тела
	defer response.Body.Close()

	// чтение файла
	// body, err := ioutil.ReadAll(response.Body)
	// if err != nil {
	// 	return "", fmt.Errorf("failed to read body")
	// }

	return response.Body, nil
	// return string(body), nil
}
