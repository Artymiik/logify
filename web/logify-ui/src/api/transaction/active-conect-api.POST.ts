import Cookies from "js-cookie";
import axios from "axios";

// Активация конекта
// ======================================
export const activeConectAPI = async (conect: string) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/transaction/active/conect`,
      {
        conect: conect,
      },
      {
        // Включаем headers
        // ================
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
