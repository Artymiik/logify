using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using Uri = System.Uri;

namespace cs_lib.Core.Classes
{
    public class HttpRequests
    {
        /// <summary>
        /// Создание клиента, для отправки запросов
        /// </summary>
        private readonly HttpClient client = new HttpClient();
    
        /// <summary>
        /// Инициализация конфига
        /// </summary>
        private readonly Config _config;
    
        /// <summary>
        /// Констуктор класса
        /// </summary>
        public HttpRequests(Config config)
        {
            _config = config;
        }

        /// <summary>
        /// Функция отправки данных на сервер
        /// </summary>
        public string SendRequest<T>(string route, string method, T body = default, string token = null)
        {
            // Вылидация данных
            if (string.IsNullOrEmpty(route) || string.IsNullOrEmpty(method))
            {
                throw new ArgumentNullException("Invalid Route or Method");
            }

            // Создание HttpRequestMessage
            var request = new HttpRequestMessage(new HttpMethod(method), this._config.ReturnConfig().SERVER_URL + route);

            // Проверка на существования токена
            if (!string.IsNullOrEmpty(token))
            {
                request.Headers.Add("Authorization", token);   
            }
            
            // Серелизация данных
            string json = JsonSerializer.Serialize(body);
            
            // Установка контента
            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");
            request.Content = content;

            // Отправка запроса на сервер
            var response = this.client.SendAsync(request, HttpCompletionOption.ResponseContentRead).Result;

            // Обработка ошибок
            if (!response.IsSuccessStatusCode)
            {
                // Ошибка
                return response.Content.ReadAsStringAsync().Result;
            }
            else
            {
                // Все ОК
                return response.Content.ReadAsStringAsync().Result;
            }
        }
    }
}