package transaction

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/Artymiik/logify/pkg/conects"
	"github.com/Artymiik/logify/services/logs"
	"github.com/Artymiik/logify/types"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{db: db}
}

// ------------------------------------
// Уменьшение баланса пользователя
// ------------------------------------
func (s *Store) minusBalance(user types.User) error {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// инициализация store лога
	var storeLogs = logs.NewStore(s.db)

	// Начало транзакции
	tx, err := s.db.Begin()
	if err != nil {
		return err
	}

	// получаем logs
	logs, err := storeLogs.GetLogsByUserID(user.ID)
	if err != nil {
		return err
	}

	// подгатовка запроса на обновление status у логов
	stmt, err := tx.PrepareContext(ctx, "update logs set status = ? where id = ?")
	if err != nil {
		tx.Rollback()
		return err
	}
	defer stmt.Close()

	// проверка если balance 0 то заблокировать logs
	if user.Balance <= 0 {
		// отключаем логи у пользователя
		for _, log := range logs {
			_, err := stmt.Exec("turnedOff", log.ID)
			if err != nil {
				tx.Rollback()
				return err
			}
		}

		// Фиксация транзакции
		err = tx.Commit()
		if err != nil {
			return err
		}

		return nil
	}

	// уменьшаем баланс
	balance := user.Balance - 0.16666666666666666

	// обновлять зачение status у logs
	// включаем логи у пользователя
	// for _, log := range logs {
	// 	_, err := stmt.Exec("active", log.ID)
	// 	if err != nil {
	// 		tx.Rollback()
	// 		return err
	// 	}
	// }

	// обновляем баланс в БД
	_, err = s.db.ExecContext(ctx, "update users set balance = ? where id = ?", balance, user.ID)
	if err != nil {
		return err
	}

	// Фиксация транзакции
	err = tx.Commit()
	if err != nil {
		return err
	}

	// возвращяем результат
	return nil
}

// ------------------------------------
// Вывод баланса пользователя по id
// ------------------------------------
func (s *Store) GetBalanceByUserID(userID int) (float64, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// переменная для хранения баланса
	var balance float64

	// запрос в БД на вывод баланса
	err := s.db.QueryRowContext(ctx, "select balance from users where id = ?", userID).Scan(&balance)
	if err != nil {
		return 0, err
	}

	return balance, nil
}

// ------------------------------------
// Обновление баланса у всех пользователей
// ------------------------------------
func (s *Store) UpdateBalanceAllUsers() {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// получаем всех пользователей
	rows, err := s.db.QueryContext(ctx, "select * from users")
	if err != nil {
		return
	}

	// Читаем данные
	// Создаем массив
	var users []types.User

	// цикл по данным users
	for rows.Next() {
		var user types.User
		err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.UserName, &user.UserNameUpper, &user.Email, &user.EmailUpper, &user.Password, &user.Balance)

		if err != nil {
			return
		}

		// добовляем в массив
		users = append(users, user)
	}

	// пробегаемся по массиву и изменяем баланс
	for _, user := range users {
		if err := s.minusBalance(user); err != nil {
			return
		}
	}
}

// ------------------------------------
// ------------------------------------
// КОНЕКТЫ
// ------------------------------------
// Активация конекта
// ------------------------------------
func (s *Store) ActiveConect(userID int, conect string) (string, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	var storeLogs = logs.NewStore(s.db)

	// проверка что конект еще не активирован
	var statusConect string
	err := s.db.QueryRowContext(ctx, "select status from conects where conect = ?", conect).Scan(&statusConect)
	if err != nil || statusConect == "used" {
		return "", fmt.Errorf("the conect has been activated")
	}

	// расшифровываем конект
	dataConect, err := conects.ReturnsDataConect(conect)
	if err != nil || dataConect.Balance == -1 || dataConect.CountLogFieldsFile == -1 || dataConect.CountSites == -1 {
		return "", fmt.Errorf("conect activation error")
	}

	// запрос на активацию конекта (update)
	_, err = s.db.ExecContext(ctx, "update conects set status = ? where conect = ? and userId = ?", "used", conect, userID)
	// обработка ошибки
	if err != nil {
		return "", err
	}

	// запрос на обновления баланса пользователя
	_, err = s.db.ExecContext(ctx, "update users set balance = balance + ? where id = ?", dataConect.Balance, userID)
	// обработка ошибки
	if err != nil {
		return "", err
	}

	// -------------------------------------------
	// изменять в logs status на active (gorutine)
	// получаем logs
	logs, err := storeLogs.GetLogsByUserID(userID)
	if err != nil {
		return "", err
	}

	// подгатовка запроса на обновление status у логов
	stmt, err := s.db.Prepare("update logs set status = ? where id = ?")
	if err != nil {
		return "", err
	}
	defer stmt.Close()

	// обновлять зачение status у logs
	// включаем логи у пользователя
	for _, log := range logs {
		_, err := stmt.ExecContext(ctx, "active", log.ID)
		if err != nil {
			return "", err
		}
	}

	// --------------------
	// возвращяем результат
	return "the conect is activated!", nil
}

// --------------------------
// Права на получения конекта
// --------------------------
func (s *Store) HasConect(userID int) bool {
	return true
}

// -----------------
// Возвращяем конект
// -----------------
func (s *Store) ReturnsConect(userID int) (string, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// получаем баланс пользователя
	balance, err := s.GetBalanceByUserID(userID)
	if err != nil {
		return "", err
	}

	// получаем count(logs по userID)
	var countLogs int
	err = s.db.QueryRowContext(ctx, "select count(*) as countLogs from logs where userId = ?", userID).Scan(&countLogs)
	if err != nil {
		return "", err
	}

	// count(кол-во часов всех логов по userID  time.Now() - createdAt)
	var timeLogs string
	err = s.db.QueryRowContext(ctx, "select SEC_TO_TIME(SUM(TIMESTAMPDIFF(SECOND, createdAt, NOW()))) as total_time from logs where userId = ?", userID).Scan(&timeLogs)
	if err != nil {
		return "", err
	}

	// получаем count(sites по userID)
	var countSites int
	err = s.db.QueryRowContext(ctx, "select count(*) as countSites from sites where userId = ?", userID).Scan(&countSites)
	if err != nil {
		return "", err
	}

	// генерируем конект
	conect, err := conects.GenerateConect(&types.GenerateConect{
		Balance:            balance,
		CountLogs:          countLogs,
		TimeLogs:           timeLogs,
		CountLogFieldsFile: 1000,
		CountSites:         countSites,
	})
	if err != nil {
		return "", err
	}

	// если баланс нуливой, то добовляем 2.5
	if balance <= 0 {
		balance = balance + 2.5
	}

	// сохранения конекта в БД
	_, err = s.db.ExecContext(ctx, "insert into conects (userId, conect, price, createdAt) values(?, ?, ?, ?)", userID, conect, balance, time.Now().Format("2006-01-02 15:04:05"))
	if err != nil {
		return "", err
	}

	fmt.Println(balance, timeLogs, countLogs, countSites)
	return conect, nil
}

// -----------------------------
// История конектов пользователя
// -----------------------------
func (s *Store) HistoryConects(userID int) ([]types.Conect, error) {
	// определение контекста времени
	ctx, cancel := context.WithTimeout(context.Background(), 7*time.Second)
	defer cancel()

	// запрос к БД для получения всех conect пользователя
	rows, err := s.db.QueryContext(ctx, "select * from conects where userId = ?", userID)
	if err != nil {
		return nil, err
	}

	// создаем массив
	var historys []types.Conect

	// цикл по данным rows
	for rows.Next() {
		var history types.Conect

		// смотрим на результат и вывод ошибки
		if err := rows.Scan(&history.ID, &history.UserID, &history.Conect, &history.Status, &history.Price, &history.CreatedAt); err != nil {
			return nil, err
		}

		// добавляем в массив
		historys = append(historys, history)
	}

	// если массив пустой, возвращаем пустой массив
	if len(historys) == 0 {
		return []types.Conect{}, nil
	}

	// возвращяем историю
	return historys, nil
}
