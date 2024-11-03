package interfaces

import "github.com/Artymiik/logify/types"

type ITransaction interface {
	// ------------------------------------
	// Вывод баланса пользователя по id
	// ------------------------------------
	GetBalanceByUserID(userID int) (float64, error)

	// ------------------------------------
	// Обновление баланса у всех пользователей
	// ------------------------------------
	UpdateBalanceAllUsers()

	// ------------------------------------
	// Активация конекта
	// ------------------------------------
	ActiveConect(userID int, conect string) (string, error)

	// --------------------------
	// Права на получения конекта
	// --------------------------
	HasConect(userID int) bool

	// -----------------
	// Возвращяем конект
	// -----------------
	ReturnsConect(userID int) (string, error)

	// -----------------------------
	// История конектов пользователя
	// -----------------------------
	HistoryConects(userID int) ([]types.Conect, error)
}
