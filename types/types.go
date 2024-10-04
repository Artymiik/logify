package types

import "time"

// --------------------
// --------------------
// Interfaces Stores
// --------------------
type UserStore interface {
	GetUserByEmail(email string) (*User, error)
	GetUserById(id int) (*User, error)
	CreateUser(User) error
}

type SiteStore interface {
	CreateSite(Site) error
	GetSiteByName(name string) (*Site, error)
	GetSiteById(id int) (*Site, error)
	GetSiteBySiteID(id int) (*Site, error)
}

type LogsStore interface {
	CreateDefaultLog(Log) error
	SelectLogs(id int) ([]Log, error)
	CreateLogFile(name, string string, siteId int) error
	GetLog(uniqueClient string) (*Log, error)
	InsertIntoFileLog(uniqueClient, deUniqueClient, link string, log *Log) error
	ValidatePayload(log *Log, payload *InsertLogPayload) error
}

//-------------------
//-------------------
// Тип для возращений в функциях
//-------------------

// -------------------
// Тип пользователя
// -------------------
type User struct {
	ID        int       `json:"id"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"createdAt"`
}

// -------------------
// Тип сайта
// -------------------
type Site struct {
	ID          int       `json:"id"`
	UserId      int       `json:"userId"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Link        string    `json:"link"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
}

// -------------------
// Тип логов
// -------------------
type Log struct {
	ID           int         `json:"id"`
	SiteID       int         `json:"siteID"`
	Name         string      `json:"name"`
	UniqueClient []byte      `json:"uniqueClient"`
	Router       string      `json:"router"`
	Settings     SettingsLog `json:"settings"`
}

// -------------------
// Тип настройков для логов
// -------------------
type SettingsLog struct {
	Timestamp       string `json:"timestamp"` // Выжные данные в log
	URL             bool   `json:"url"`
	Methods         bool   `json:"methods"`
	StatusCode      bool   `json:"statusCode"`
	ResponseMessage bool   `json:"responseMessage"`
	Description     bool   `json:"description"` // Данные второстепенной степени
	IPAddress       bool   `json:"ip_address"`
	GPS             bool   `json:"gps"`
	UserName        bool   `json:"username"`
	Email           bool   `json:"email"`
	Cookie          bool   `json:"cookie"`
	LocalStorage    bool   `json:"localStorage"`
	Session         bool   `json:"session"`
	Authenticate    bool   `json:"authenticate"`
}

//-------------------
//-------------------
// Тип для DTOs
//-------------------

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
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// -------------------
// Тип create site
// -------------------
type CreateSitePayload struct {
	SiteName        string `json:"name" validate:"required"`
	SiteDescription string `json:"description" validate:"required"`
	SiteLink        string `json:"link" validate:"required"`
}

// -------------------
// Тип log
// -------------------
type CreateLogPayload struct {
	Name   string `json:"name" validate:"required"`
	Router string `json:"router" validate:"required"`
}

type InsertLogPayload struct {
	UniqueClient string              `json:"uniqueClient" validate:"required"`
	Action       ActionInsertPayload `json:"action"`
}
type ActionInsertPayload struct {
	Timestamp       string `json:"timestamp"` // Выжные данные в log
	URL             string `json:"url"`
	Methods         string `json:"methods"`
	StatusCode      string `json:"statusCode"`
	ResponseMessage string `json:"responseMessage"`
	Description     string `json:"description"` // Данные второстепенной степени
	IPAddress       string `json:"ip_address"`
	GPS             string `json:"gps"`
	UserName        string `json:"username"`
	Email           string `json:"email"`
	Cookie          string `json:"cookie"`
	LocalStorage    string `json:"localStorage"`
	Session         string `json:"session"`
	Authenticate    string `json:"authenticate"`
}

//-------------------
//-------------------
// Тип для данных
//-------------------
type LogStruct struct {
	Title     string         `json:"Title"`
	TimeStamp string         `json:"TimeStamp"`
	Client    LogDataClient  `json:"Client"`
	Server    LogDataServer  `json:"Server"`
	Details   LogDataDetails `json:"Details"`
}

type LogDataClient struct {
	URL     string `json:"URL"`
	Methods string `json:"Methods"`
}
type LogDataServer struct {
	StatusCode      string `json:"StatusCode"`
	ResponseMessage string `json:"ResponseMessage"`
}
type LogDataDetails struct {
	Description  string `json:"Description"`
	IPAddress    string `json:"IPAddress"`
	GPS          string `json:"GPS"`
	UserName     string `json:"UserName"`
	Email        string `json:"Email"`
	Cookie       string `json:"Cookie"`
	Session      string `json:"Session"`
	Authenticate string `json:"Authenticate"`
}
