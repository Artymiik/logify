CREATE TABLE IF NOT EXISTS logs (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `siteId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `uniqueClient` VARCHAR(255) NOT NULL,
  `router` VARCHAR(100) NOT NULL,
  `timestamp` BOOLEAN NOT NULL DEFAULT TRUE,
  `url` BOOLEAN NOT NULL DEFAULT TRUE,
  `methods` BOOLEAN NOT NULL DEFAULT TRUE,
  `statusCode` BOOLEAN NOT NULL DEFAULT TRUE,
  `responseMessage` BOOLEAN NOT NULL DEFAULT TRUE,
  `description` BOOLEAN NOT NULL DEFAULT FALSE,
  `ipAddress` BOOLEAN NOT NULL DEFAULT FALSE,
  `gps` BOOLEAN NOT NULL DEFAULT FALSE,
  `username` BOOLEAN NOT NULL DEFAULT FALSE,
  `email` BOOLEAN NOT NULL DEFAULT FALSE,
  `cookie` BOOLEAN NOT NULL DEFAULT FALSE,
  `localStorage` BOOLEAN NOT NULL DEFAULT FALSE,
  `session` BOOLEAN NOT NULL DEFAULT FALSE,
  `authenticate` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY (uniqueClient)
);