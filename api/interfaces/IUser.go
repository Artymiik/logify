package interfaces

import "github.com/Artymiik/logify/types"

type IUser interface {
	// ---------------------
	// ---------------------
	// Функция для вывода из БД user по email
	// ---------------------
	GetUserByEmail(email string) (*types.User, error)

	// ------------------------
	// ------------------------
	// Получение пользователя из БД по ID
	// ------------------------
	GetUserById(id int) (*types.User, error)

	// ------------------------
	// ------------------------
	// Создание пользователя
	// ------------------------
	CreateUser(types.User) error
}
