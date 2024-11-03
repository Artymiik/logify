using System;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace cs_lib.Core
{
    /// <summary>
    /// Класс модель, для хранения переменных
    /// </summary>
    public class AppConfig
    {
        [JsonPropertyName("SERVER_URL")]
        public string SERVER_URL { get; }
        
        [JsonPropertyName("ACCESS_KEY_S3")] 
        public string ACCESS_KEY_S3 { get; }
        
        [JsonPropertyName("SECRET_KEY_S3")] 
        public string SECRET_KEY_S3 { get; }

        /// <summary>
        /// Инициализация переменных
        /// </summary>
        public AppConfig()
        {
            SERVER_URL = "http://localhost:8080/api/v1/";
            ACCESS_KEY_S3 = "7473cb7bcdeb473fbd4c6d9d628ac976";
            SECRET_KEY_S3 = "2950ff80ecbc478c8adbe0054f383882";
        }
    }
    
    public class Config
    {
        /// <summary>
        /// Вывод переменных из конфига
        /// </summary>
        public AppConfig ReturnConfig()
        {
            return new AppConfig();
        }
    }
}