import axios from "axios";

// ------------------------------
// Получение IP_Address пользователя
// ------------------------------
export const getIPv4 = async () => {
  try {
    // ------------------------------
    // Создание запроса на получение IP
    // ------------------------------
    const response = await axios.get("https://api.ipify.org?format=json");

    // ------------------------------
    // Возращяем результат IP (142.168.20.1)
    // ------------------------------
    return response.data.ip;
  } catch (error) {
    // ------------------------------
    // Если есть ошибки, отправляем пользователю
    // ------------------------------
    return error;
  }
};