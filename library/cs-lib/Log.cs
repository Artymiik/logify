using System;
using cs_lib.Core.Classes;
using cs_lib.Models;

namespace cs_lib
{
    /// <summary>
    /// Глобальная функция для работы с логами
    /// </summary>
    public class Log
    {
        /// <summary>
        /// Инициализация класса взаимодействия с сервером
        /// </summary>
        private readonly HttpRequests _http;

        /// <summary>
        /// Констуктор класса Log
        /// </summary>
        public Log(HttpRequests http)
        {
            _http = http;
        }
    
        /// <summary>
        /// Метод записи данных в лог
        /// </summary>
        public void Insert(string uniqueClient, Args arg)
        {
            // Создания тела запроса
            var body = new
            {
                uniqueClient = uniqueClient,
                args = arg
            };
            
            // Отправка запроса на сервер
            string response = _http.SendRequest("insert", "POST", body);
        
            // Вывод сообщение от сервера
            Console.WriteLine(response);
        }

        /// <summary>
        /// Вывод содержимого файла S3
        /// </summary>
        public string Select(string uniqueClient)
        {
            return "";
        }
    }
}
