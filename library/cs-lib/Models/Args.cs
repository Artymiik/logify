using System.Text.Json.Serialization;

namespace cs_lib.Models
{
    public class Args
    {
        [JsonPropertyName("statusCode")]
        public string StatusCode { get; set; }
    
        [JsonPropertyName("responseMessage")]
        public string ResponseMessage { get; set; }
    
        [JsonPropertyName("description")]
        public string Description { get; set; }
    
        [JsonPropertyName("ip_address")]
        public string IPAddress { get; set; }
    
        [JsonPropertyName("gps")]
        public string GPS { get; set; }
    
        [JsonPropertyName("username")]
        public string UserName { get; set; }
    
        [JsonPropertyName("email")]
        public string Email { get; set; }
    
        [JsonPropertyName("cookie")]
        public string Cookie { get; set; }
    
        [JsonPropertyName("localStorage")]
        public string LocalStorage { get; set; }
    
        [JsonPropertyName("session")]
        public string Session { get; set; }
    
        [JsonPropertyName("authenticate")]
        public string Authenticate { get; set; }
    }
}