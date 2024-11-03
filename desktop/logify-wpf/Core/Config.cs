using System.Text.Json.Serialization;

namespace logify_wpf.Core
{
    public class AppConfig
    {
        [JsonPropertyName("SERVER_URL")]
        public string SERVER_URL { get; }

        public AppConfig()
        {
            SERVER_URL = "http://localhost:8080/api/v1/";
        }
    }
    
    public class Config
    {
        public AppConfig ReturnConfig()
        {
            return new AppConfig();
        }
    }
}