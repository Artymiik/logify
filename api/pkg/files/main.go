package files

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"strings"

	env "github.com/Artymiik/logify/config"
	"github.com/Artymiik/logify/types"
	"github.com/Artymiik/logify/utils"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// -------------------------
// -------------------------
// ФАЙЛОВАЯ СИСТЕМА
// -------------------------
// -------------------------

// -------------------------
// -------------------------
// Получение имени файла log
// -------------------------
func GetFileName(deUniqueClient, log string) (string, error) {
	// Получаем данные из uniqueClient
	email, err := utils.Encrypt(strings.Split(deUniqueClient, "-")[0])
	if err != nil {
		return "", err
	}

	logName, err := utils.Encrypt(log)
	if err != nil {
		return "", err
	}

	// Формируем имя файла
	fileName := fmt.Sprintf("log-%s[%s].json", email, logName)

	// возврашяем результат
	return fileName, nil
}

// -------------------------
// -------------------------
// Создания клиента s3
// -------------------------
func CreateS3Client() (*s3.Client, error) {
	// устанавливаем кредиты или данные api user
	creds := credentials.NewStaticCredentialsProvider(env.Envs.ACCESS_KEY, env.Envs.SECRET_KEY, "")

	// настройка конфига для взаимодействия с s3 storage
	cfg, err := config.LoadDefaultConfig(context.Background(),
		config.WithRegion("ru-1"), // Установите регион Selectel S3
		config.WithEndpointResolver(aws.EndpointResolverFunc(func(service, region string) (aws.Endpoint, error) {
			return aws.Endpoint{
				URL:           "https://s3.ru-1.storage.selcloud.ru", // Укажите правильный URL Selectel S3
				SigningRegion: "ru-1",
			}, nil
		})),
		config.WithCredentialsProvider(creds),
	)

	// обработка ошибки
	if err != nil {
		return nil, fmt.Errorf("error loading configuration")
	}

	// возвращяем client
	return s3.NewFromConfig(cfg), nil
}

// -------------------------
// -------------------------
// Функция для загрузки данных в S3
// -------------------------
func UploadDataToS3(client *s3.Client, bucketName, fileName string, data []byte) error {
	// Загружаем данные в s3 storage
	_, err := client.PutObject(context.Background(), &s3.PutObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
		Body:   bytes.NewReader(data),
	})

	// обработка ошибки
	if err != nil {
		return fmt.Errorf("error uploading the file")
	}

	// возвращяем результат
	return nil
}

// -------------------------
// -------------------------
// Чтения и обновления данных из S3
// -------------------------
func ReadDataInS3(client *s3.Client, bucketName, fileName string, logData *types.LogStruct) ([]byte, error) {
	// скачиваем файл
	resp, err := client.GetObject(context.Background(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
	})
	if err != nil {
		return nil, fmt.Errorf("error downloading the file")
	}
	defer resp.Body.Close()

	// Проверяем, пустой ли файл
	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading file data")
	}

	if len(data) == 0 {
		// Файл пустой, инициализируем массив
		logEntries := []types.LogStruct{}
		logEntries = append(logEntries, *logData)

		// Кодируем JSON
		convertJSON, err := json.MarshalIndent(logEntries, "", " ")
		if err != nil {
			return nil, fmt.Errorf("json conversion error")
		}

		return convertJSON, nil
	}

	// Декодируем JSON
	var logEntries []types.LogStruct
	err = json.Unmarshal(data, &logEntries)
	if err != nil {
		return nil, fmt.Errorf("JSON decoding error")
	}

	// Добавляем новую запись в массив
	logEntries = append(logEntries, *logData)

	// Кодируем JSON
	convertJSON, err := json.MarshalIndent(logEntries, "", " ")
	if err != nil {
		return nil, fmt.Errorf("json conversion error")
	}

	return convertJSON, nil
}

// -------------------------
// -------------------------
// Чтения данных из файла S3
// -------------------------
func ReadLogsFromS3(client *s3.Client, bucketName, fileName string) ([]map[string]interface{}, error) {
	// скачиваем файл
	resp, err := client.GetObject(context.Background(), &s3.GetObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(fileName),
	})
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// декодируем JSON
	var logData []map[string]interface{}
	// обработка ошибки
	err = json.NewDecoder(resp.Body).Decode(&logData)
	if err != nil {
		return nil, fmt.Errorf("json parsing error")
	}

	// возвращаем результат
	return logData, nil
}

// func DownloadFile(fileName, bucket_name string) (string, error) {
// 	// создаем клиента S3
// 	client, err := CreateS3Client()
// 	if err != nil {
// 		return "", err
// 	}

// 	downloader := s3manager.NewDownloader(context.Background(), client)

// 	file, err := os.CreateTemp("", "s3-download-")
// 	if err != nil {
// 		return "", err
// 	}
// 	defer file.Close()

// 	_, err = downloader.Download(file, &s3.GetObjectInput{
// 		Bucket: aws.String(bucket_name),
// 		Key:    aws.String(fileName),
// 	})
// 	if err != nil {
// 		return "", err
// 	}

// 	return file.Name(), nil
// }
