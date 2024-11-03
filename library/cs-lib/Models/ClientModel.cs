using System.Text.Json.Serialization;

namespace cs_lib.Models
{
    public class ClientModel
    {
        
    }

    public class DeleteModel
    {
        [JsonPropertyName("logName")]
        public string FileName { get; set; }
    }

    public class CreateModel
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        
        [JsonPropertyName("route")]
        public string Route { get; set; }
        
        [JsonPropertyName("category")]
        public string Category { get; set; }
    }
    
    public class TokenResponse
    {
        public string token { get; set; }
    }
}