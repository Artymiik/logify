using System;
using cs_lib.Core;
using cs_lib.Core.Classes;
using cs_lib.Models;
using Newtonsoft.Json;

namespace cs_lib
{
    public class Client
    {
        /// <summary>
        /// Токен пользователя из signin
        /// </summary>
        private string token;

        /// <summary>
        /// Инициализация класса взаимодействия с сервером
        /// </summary>
        private readonly HttpRequests _http;

        /// <summary>
        /// Инициализация класса проверки и защиты
        /// </summary>
        private readonly Protected _ptd;

        /// <summary>
        /// Констуктор класса Client
        /// </summary>
        public Client(HttpRequests http, Protected ptd)
        {
            _http = http;
            _ptd = ptd;
        }
        
        /// <summary>
        /// Вход и получение токена пользователя
        /// </summary>
        /// <returns></returns>
        public void Signin(string email, string password)
        {
            // Валидация данных от пользователя
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException("Email or password is empty");
            }

            // Отправка на сервер данных
            string response = this._http.SendRequest("signin", "POST", new {email, password});

            // Получение токена от сервера
            var tokenConvert = JsonConvert.DeserializeObject<TokenResponse>(response);

            // Сохраняем токен в переменную
            this.token = tokenConvert.token;
        }

        /// <summary>
        /// Взаимодействие с логом
        /// </summary>
        /// <param name="action">Действие для лога</param>
        public void Log<T>(string action, T args = default)
        {
            // Проверка токена в Protected
            _ptd.IsToken(token);
            
            // Обработка действий
            switch (action)
            {
                case "delete":
                    this.Delete(args as DeleteModel);
                    break;
                case "create":
                    this.Create(args as CreateModel);
                    break;
                default:
                    throw new ArgumentException("Invalid action");
            }
        }

        /// <summary>
        /// Удаление токена
        /// </summary>
        private void Delete(DeleteModel model)
        {
            // Отправка на сервер данных
            string response = this._http.SendRequest($"root/{model.FileName}/delete", "DELETE", new { }, this.token);
            
            // Вывод в консоль результата
            Console.WriteLine(response);
        }

        /// <summary>
        /// Создания токена
        /// </summary>
        private void Create(CreateModel model)
        {
            // Валидация данных
            this._ptd.IsCreate(model);
            
            // Отправка на сервер данных
            string response = this._http.SendRequest("", "POST", model, token);
            
            // Вывод в консоль результата
            Console.WriteLine(response);
        }
    }
}