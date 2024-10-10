import axios from "axios";

// Вход в аккаунт
// ==============
export const signinAPI = async (email: string, password: string) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/signin`,
      {
        email: email,
        password: password,
      }
    );

    // Возвращяем результат
    // ====================
    return {
      status: response.status,
      data: response.data,
    };
  } catch {
    // Возвращяем результат об ошибке сервера
    // ======================================
    return {
      status: 500,
      data: "Server error, please try again",
    };
  }
};
