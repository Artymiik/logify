class AppConfig {
  constructor() {
    // @type {string}
    this.SERVER_URL = "http://localhost:8080/api/v1/";

    // @type {string}
    this.ACCESS_KEY_S3 = "7473cb7bcdeb473fbd4c6d9d628ac976";

    // @type {string}
    this.SECRET_KEY_S3 = "2950ff80ecbc478c8adbe0054f383882";
  }
  /// Инициализация переменных
}

class Config {
  // returns {AppConfig}
  ReturnConfig() {
    return new AppConfig();
  }
}

export { AppConfig, Config };
