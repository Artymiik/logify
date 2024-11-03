using System;
using cs_lib.Models;

namespace cs_lib.Core
{
    public class Protected
    {
        /// <summary>
        /// Проверка валидности и существование токена
        /// </summary>
        public void IsToken(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedAccessException("Token is empty, please SignIn.");
            }

            return;
        }

        /// <summary>
        /// Проверка валидности данных по созданию лога
        /// </summary>
        public void IsCreate(CreateModel model)
        {
            if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Route) ||
                string.IsNullOrEmpty(model.Category))
            {
                throw new ArgumentNullException("[Name/Route/Category]:not used");
            }

            return;
        }
    }
}