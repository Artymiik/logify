import axios from "axios";
import Cookies from "js-cookie";

// Выход пользователя
// ========================
export const signoutAPI = async () => {
  try {
    // Удаление cookie
    Cookies.remove("OAuth");
  } catch (error: any) {
    // Возвращяем результат об ошибке клиента
    // ======================================
    return {
      status: 500,
      data: {
        error: "Server error, please try again",
      },
    };
  }
};
