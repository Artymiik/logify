import axios from "axios";

// Регестрация пользователя
// ========================
export const signupAPI = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    // Отправляем запрос на сервер
    // ===========================
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URI}/signup`,
      {
        firstName: firstName,
        lastName: lastName,
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
