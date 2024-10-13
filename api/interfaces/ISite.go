package interfaces

import "github.com/Artymiik/logify/types"

type ISite interface {
	// ------------------------
	// ------------------------
	// Создание сайта
	// ------------------------
	CreateSite(types.Site) error

	// ------------------------
	// ------------------------
	// Получение данных сайта по Name
	// ------------------------
	GetSiteByName(name string) (*types.Site, error)

	// ------------------------
	// ------------------------
	// Получение данных sites по ID
	// ------------------------
	GetSiteById(id int) (*types.Site, error)

	// ------------------------
	// ------------------------
	// Получение данных sites по siteID
	// ------------------------
	GetSiteBySiteID(id int) (*types.Site, error)

	// ------------------------
	// ------------------------
	// Получение всех сайтов sites по userID
	// ------------------------
	GetSitesByUserID(userID int) ([]types.Site, error)
}
