package pkg

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
func GetMethods(url string, w http.ResponseWriter, r *http.Request) (string, error) {
	req, err := http.NewRequest(r.Method, url, r.Body)
	if err != nil {
		return "", err
	}

	for key, value := range r.Header {
		req.Header[key] = value
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	method := r.Method

	return method, nil
}
