CREATE TABLE IF NOT EXISTS details_log (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cookie` VARCHAR(100) DEFAULT NULL,
  `localStorage` VARCHAR(100) DEFAULT NULL,
  `session` VARCHAR(100) DEFAULT NULL,

  PRIMARY KEY (id)
);
