package check

import (
	"fmt"
	"net/http"
)

// ------------------------
// Проверка сайта
// ------------------------
func CheckWebSite(linkSite string) error {
	url := linkSite

	// ---------------------
	// Проверка на существование сайта
	// ---------------------
	response, err := http.Get(url)
	if err != nil {
		return fmt.Errorf("the site is not available")
	}

	defer response.Body.Close()

	// ---------------------
	// Получение кода http ответа от страницы
	// ---------------------
	if response.StatusCode != http.StatusOK {
		return fmt.Errorf("the site is not available")
	}

	return nil
}

// ------------------------
// Получение Methods
// ------------------------
func GetMethods(url string) (string, error) {
	// отправляем запрос на сайт
	response, err := http.Head(url)
	if err != nil {
		return "", fmt.Errorf("error sending the request")
	}
	defer response.Body.Close()

	// Получаем метод из заголовка "Method"
	method := response.Header.Get("Method")

	// возвращяем ответ
	return method, nil
}
