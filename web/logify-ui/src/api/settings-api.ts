import Cookies from "js-cookie";
import axios from "axios";

// Получение настроек log
// ======================
export const settingsAPI = async (siteName: string, logName: string) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URI}/${siteName}/${logName}/settings`,
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
  } catch (err) {
    // Возвращяем результат об ошибке сервера
    // ======================================
    return {
      status: 500,
      data: {
        error: "Server error, please try again",
      },
    };
  }
};
