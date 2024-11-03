package types

//-------------------
//-------------------
// Тип для возращений в функциях
//-------------------

// -------------------
// Тип пользователя
// -------------------
type User struct {
	ID            int     `json:"id"`
	FirstName     string  `json:"firstName"`
	LastName      string  `json:"lastName"`
	UserName      string  `json:"username"`
	UserNameUpper string  `json:"username_upper"`
	Email         string  `json:"email"`
	EmailUpper    string  `json:"email_upper"`
	Password      string  `json:"password"`
	Balance       float64 `json:"balance"`
}

// -------------------
// Тип сайта
// -------------------
type Site struct {
	ID          int    `json:"id"`
	UserId      int    `json:"userId"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Link        string `json:"link"`
	Status      string `json:"status"`
}

// -------------------
// Тип логов
// -------------------
type Log struct {
	ID           int         `json:"id"`
	DetailsLogId int         `json:"details_log_id"`
	SiteID       int         `json:"siteID"`
	UserID       int         `json:"userID"`
	Name         string      `json:"name"`
	UniqueClient string      `json:"uniqueClient"`
	Router       string      `json:"router"`
	Status       string      `json:"status"`
	CreatedAt    string      `json:"createdAt"`
	Settings     SettingsLog `json:"settings"`
}

// -------------------
// Тип настройков для логов
// -------------------
type SettingsLog struct {
	Timestamp       bool `json:"timestamp"` // Выжные данные в log
	URL             bool `json:"url"`
	Methods         bool `json:"methods"`
	StatusCode      bool `json:"statusCode"`
	ResponseMessage bool `json:"responseMessage"`
	Description     bool `json:"description"` // Данные второстепенной степени
	IPAddress       bool `json:"ip_address"`
	GPS             bool `json:"gps"`
	UserName        bool `json:"username"`
	Email           bool `json:"email"`
	Cookie          bool `json:"cookie"`
	LocalStorage    bool `json:"localStorage"`
	Session         bool `json:"session"`
	Authenticate    bool `json:"authenticate"`
}

type LogQuery struct {
	ID           int    `json:"id"`
	Name         string `json:"name"`
	UniqueClient string `json:"uniqueClient"`
	Status       string `json:"status"`
	CreatedAt    string `json:"createdAt"`
}

// -------------------
// Тип конектов
// -------------------
type Conect struct {
	ID        int     `json:"id"`
	UserID    int     `json:"userID"`
	Conect    string  `json:"conect"`
	Status    string  `json:"status"`
	Price     float64 `json:"price"`
	CreatedAt string  `json:"createdAt"`
}

// -------------------
// Тип details log БД
// -------------------
type DetailsLog struct {
	ID           int    `json:"id"`
	Cookie       string `json:"cookie"`
	LocalStorage string `json:"localStorage"`
	Session      string `json:"session"`
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
	Email    string `json:"email"`
	Password string `json:"password"`
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
	Name     string `json:"name" validate:"required"`
	Router   string `json:"router" validate:"required"`
	Category string `json:"category" validate:"required"`
}

type SettingsLogPayload struct {
	Settings SettingsLog `json:"settings"`
}

type InsertLogPayload struct {
	UniqueClient string            `json:"uniqueClient" validate:"required"`
	Args         ArgsInsertPayload `json:"args"`
}
type ArgsInsertPayload struct {
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

// -------------------
// Тип транзакций
// -------------------
type ActiveConectPayload struct {
	Conect string `json:"conect" validate:"required"`
}

// -------------------
// -------------------
// Тип для данных *(log.json)
// -------------------
type LogStruct struct {
	Title     string         `json:"title"`
	TimeStamp string         `json:"timestamp"`
	Client    LogDataClient  `json:"client"`
	Server    LogDataServer  `json:"server"`
	Details   LogDataDetails `json:"details"`
}

type LogDataClient struct {
	URL     string `json:"url"`
	Methods string `json:"method"`
}
type LogDataServer struct {
	StatusCode      string `json:"status"`
	ResponseMessage string `json:"response"`
}
type LogDataDetails struct {
	Description  string `json:"description"`
	IPAddress    string `json:"ip_address"`
	GPS          string `json:"gps"`
	UserName     string `json:"userName"`
	Email        string `json:"email"`
	Cookie       string `json:"cookie"`
	LocalStorage string `json:"localStorage"`
	Session      string `json:"session"`
	Authenticate string `json:"authenticate"`
}

// ---------------------------
// Структура генерации конекта
// ---------------------------
type GenerateConect struct {
	Balance            float64 `json:"balance"`
	CountLogs          int     `json:"countLogs"`
	TimeLogs           string  `json:"timeLogs"`
	CountLogFieldsFile int     `json:"CountLogFieldsFile"`
	CountSites         int     `json:"countSites"`
}
