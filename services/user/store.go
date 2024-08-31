package user

import (
	"database/sql"
	"fmt"

	"github.com/sikozonpc/ecom/types"
)

type Store struct {
	db *sql.DB
}

// CreateUser implements types.UserStore.
func (s *Store) CreateUser(types.User) error {
	panic("unimplemented")
}

// GetUserById implements types.UserStore.
func (s *Store) GetUserById(id int) (*types.User, error) {
	panic("unimplemented")
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

// ---------------------
// Функция для вывода из БД user по email
// ---------------------
func (s *Store) GetUserByEmail(email string) (*types.User, error) {
	// запрос
	rows, err := s.db.Query("select * from users where email = ?", email)
	// проверка ошибки
	if err != nil {
		return nil, err
	}

	// читаем из результата
	u := new(types.User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)

		if err != nil {
			return nil, err
		}
	}

	// если нет пользователя то ошибка
	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}

	return u, nil
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
		&user.Email,
		&user.Password,
		&user.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return user, nil
}

// ------------------------
// Получение пользователя из БД по ID
// ------------------------
func GetUserById(id int) (*types.User, error) {
	return nil, nil
}

// ------------------------
// Создание пользователя
// ------------------------
func CreateUser(user types.User) error {
	return nil
}
