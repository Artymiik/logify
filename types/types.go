package types

import "time"

type UserStore interface {
	GetUserByEmail(email string) (*User, error)
	GetUserById(id int) (*User, error)
	CreateUser(User) error
}

// -------------------
// Тип пользователя
// -------------------
type User struct {
	ID        int 			`json:"id"`
	FirstName string 		`json:"firstName"`
	LastName  string 		`json:"lastName"`
	Email     string 		`json:"email"`
	Password  string 		`json:"password"`
	CreatedAt time.Time `json:"createdAt"`
}

// ---------------------
// Тип register от user
// ---------------------
type RegisterUserPayload struct {
	FirstName string `json:"firstName" validate:"required"`
	LastName  string `json:"lastName" validate:"required"`
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required,min=5,max=40"`
}

// ---------------------
// Тип login от user
// ---------------------
type LoginUserPayload struct {
	Email     string `json:"email" validate:"required,email"`
	Password  string `json:"password" validate:"required"`
}
