using System.Text.Json.Serialization;

namespace cs_lib.Models
{
    public class LogModel
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }
    
        [JsonPropertyName("timestamp")] 
        public string TimeStamp { get; set; }

        [JsonPropertyName("client")]
        public ClientStruct Client { get; set; }
    
        [JsonPropertyName("server")]
        public ServerStruct Server { get; set; }
    
        [JsonPropertyName("details")]
        public DetailsStruct Details { get; set; }
    }
    
    public class ClientStruct
    {
        [JsonPropertyName("url")]
        public string URL { get; set; }
        
        [JsonPropertyName("method")]
        public string Methods { get; set; }
    }

    public class ServerStruct
    {
        [JsonPropertyName("status")]
        public string StatusCode { get; set; }
        
        [JsonPropertyName("response")]
        public string ResponseMessage { get; set; }
    }

    public class DetailsStruct
    {
        [JsonPropertyName("description")]
        public string Description { get; set; }
        
        [JsonPropertyName("ip_address")]
        public string IPAddress { get; set; }
        
        [JsonPropertyName("gps")]
        public string GPS { get; set; }
        
        [JsonPropertyName("userName")]
        public string UserNamepe { get; set; }
        
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