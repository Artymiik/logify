package user

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/Artymiik/logify/types"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

// ------------------
// Пробегаемся по данным user
// ------------------
func scanRowIntoUser(rows *sql.Rows) (*types.User, error) {
	user := new(types.User)

	err := rows.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.UserName,
		&user.UserNameUpper,
		&user.Email,
		&user.EmailUpper,
		&user.Password,
		&user.Balance,
	)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// ---------------------
// Функция для вывода из БД user по email
// ---------------------
func (s *Store) GetUserByEmail(email string) (*types.User, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Запрос к БД на вывод пользователя по ID
	rows, err := s.db.QueryContext(ctx, "select * from users where email = ?", email)
	// проверка ошибки
	if err != nil {
		return nil, err
	}

	// -------------------------
	// читаем из результата
	// -------------------------
	u := new(types.User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)

		if err != nil {
			return nil, err
		}
	}

	// -------------------------
	// если нет пользователя то ошибка
	// -------------------------
	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
}

// ------------------------
// Получение пользователя из БД по ID
// ------------------------
func (s *Store) GetUserById(id int) (*types.User, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// Запрос к БД на вывод пользователя по ID
	rows, err := s.db.QueryContext(ctx, "select * from users where id = ?", id)
	if err != nil {
		return nil, err
	}

	// --------------------------------
	// Пробегаем и читаем данные
	// --------------------------------
	u := new(types.User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)
		if err != nil {
			return nil, err
		}
	}

	// --------------------------------
	// Если не нашли выдаем сообщение
	// --------------------------------
	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
}

// ------------------------
// Создание пользователя
// ------------------------
func (s *Store) CreateUser(user types.User) error {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	username := fmt.Sprintf("%s %s", user.FirstName, user.LastName)

	// запрос к БД на создания пользователя
	_, err := s.db.ExecContext(ctx, "insert into users (firstName, lastName, username, username_upper, email, email_upper, password) VALUES (?, ?, ?, ?, ?, ?, ?)", user.FirstName, user.LastName, username, strings.ToUpper(username), user.Email, strings.ToUpper(user.Email), user.Password)

	// ---------------------
	// Обработка ошибки БД
	// ---------------------
	if err != nil {
		return err
	}

	return nil
}
