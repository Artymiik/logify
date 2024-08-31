package types

import "time"

type UserStore interface {
	GetUserByEmail(email string) (*User, error)
	GetUserById(id int) (*User, error)
	CreateUser(User) error
}

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
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
