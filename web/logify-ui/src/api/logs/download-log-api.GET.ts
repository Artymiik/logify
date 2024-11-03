import Cookies from "js-cookie";
import axios from "axios";

// Скачивание лога
// ==============
export const downloadLogAPI = async (siteName: string, name: string) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/${siteName}/${name}/download`,
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