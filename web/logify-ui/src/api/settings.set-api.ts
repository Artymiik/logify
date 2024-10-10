import Cookies from "js-cookie";
import axios from "axios";

// Обновление настроек log
// ======================
export const settingsSetAPI = async (
  payload: any,
  siteName: string,
  logName: string
) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URI}/${siteName}/${logName}/settings/set`,
      {
        settings: payload,
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
