package site

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/Artymiik/logify/types"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

// ------------------------
// Функция сканирование массива данных
// ------------------------
func scanRowIntoSites(rows *sql.Rows) (*types.Site, error) {
	site := new(types.Site)

	err := rows.Scan(
		&site.ID,
		&site.UserId,
		&site.Name,
		&site.Description,
		&site.Link,
		&site.Status,
	)

	if err != nil {
		return nil, err
	}

	return site, nil
}

// ------------------------
// Создание сайта
// ------------------------
func (s *Store) CreateSite(site types.Site) error {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// запрос к БД на создания сайта
	_, err := s.db.ExecContext(ctx, "insert into sites (userId, name, description, link, status) values (?, ?, ?, ?, ?)", site.UserId, site.Name, site.Description, site.Link, site.Status)

	// ---------------------
	// Обработка ошибки БД
	// ---------------------
	if err != nil {
		return err
	}

	return nil
}

// ------------------------
// Получение данных сайта по Name
// ------------------------
func (s *Store) GetSiteByName(name string) (*types.Site, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from sites where name = ?", name)
	if err != nil {
		return nil, err
	}

	// -------------------------
	// Пробегаемся по данным
	// -------------------------
	site := new(types.Site)
	for rows.Next() {
		site, err = scanRowIntoSites(rows)
		if err != nil {
			return nil, err
		}
	}

	if site.ID == 0 {
		return nil, fmt.Errorf("no site found")
	}

	return site, nil
}

// ------------------------
// Функция на получение данных sites по ID
// ------------------------
func (s *Store) GetSiteById(id int) (*types.Site, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from sites where userId = ?", id)
	if err != nil {
		return nil, err
	}

	// Пробегаемся по данным
	site := new(types.Site)
	for rows.Next() {
		site, err = scanRowIntoSites(rows)
		if err != nil {
			return nil, err
		}
	}

	// Проверка на существование данных
	if site.ID == 0 {
		return nil, fmt.Errorf("no site found")
	}

	return site, nil
}

// -----------------------------------------
// Функция на получение данных sites по siteID
// -----------------------------------------
func (s *Store) GetSiteBySiteID(id int) (*types.Site, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from sites where Id = ?", id)
	if err != nil {
		return nil, err
	}

	// Пробегаемся по данным
	site := new(types.Site)
	for rows.Next() {
		site, err = scanRowIntoSites(rows)
		if err != nil {
			return nil, err
		}
	}

	// Проверка на существование данных
	if site.ID == 0 {
		return nil, fmt.Errorf("no site found")
	}

	return site, nil
}

// ------------------------
// Функция на получение всех сайтов sites по userID
// ------------------------
func (s *Store) GetSitesByUserID(userID int) ([]types.Site, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Выводим данные из БД
	rows, err := s.db.QueryContext(ctx, "select * from sites where userId = ?", userID)

	// обработка ошибки
	if err != nil {
		return nil, err
	}

	// Читаем данные
	// Создаем массив
	var sites []types.Site
	site := new(types.Site)

	for rows.Next() {
		site, err = scanRowIntoSites(rows)
		if err != nil {
			return nil, err
		}

		sites = append(sites, *site)
	}

	// Проверка что есть сайты
	if site.ID == 0 {
		return nil, fmt.Errorf("you don't have any active sites")
	}

	// Возращаем ответ
	return sites, nil
}
