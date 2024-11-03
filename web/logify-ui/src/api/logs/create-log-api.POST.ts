import Cookies from "js-cookie";
import axios from "axios";

// Создания сайта
// ==============
export const createLogAPI = async (
  siteName: string,
  name: string,
  router: string,
  category: string
) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/${siteName}/create/log`,
      {
        name: name,
        router: router,
        category: category,
      },
      {
        headers: {
          Authorization: Cookies.get("OAuth"),
        },
      }
    );

    // Возвращяем результат
    // ====================
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    // Возвращяем результат об ошибке сервера
    // ======================================
    if (error.response) {
      // Ошибка от сервера
      return {
        status: error.response.status,
        data: error.response.data,
      };
    } else {
      return {
        status: 500,
        data: {
          error: "Server error, please try again",
        },
      };
    }
  }
};
