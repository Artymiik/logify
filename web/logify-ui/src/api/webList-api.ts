import Cookies from "js-cookie";
import axios from "axios";

// Получение определенного лога (по name)
// ======================================
export const webListAPI = async () => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/select/sites`,
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
    return {
      status: error.response?.status || 500,
      data: "Server error, please try again",
    };
  }
};
