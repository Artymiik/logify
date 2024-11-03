import { createContext, useContext, useState } from "react";
import { signupAPI } from "../api/auth/signup-api.POST";

// интерфейс контекста
// ===================
interface context {
  responseServer: string;
  statusCode: number;
  loader: boolean;
  showErrorApp: boolean;
  handleSignup: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => void;
}

// инициализация контекста
// =======================
const SignupContext = createContext<context>({
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  loader: false, // значение по умолчанию для loader
  showErrorApp: false, // значение по умолчанию для showErrorWindow
  handleSignup: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const SignupProvider = ({ children }: any) => {
  // use states
  // ===================
  const [loader, setLoader] = useState<boolean>(false);
  const [responseServer, setResponseServer] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>(400);
  const [showErrorApp, setShowErrorApp] = useState<boolean>(false);

  // Функция для работы с показом уведомлением
  // =========================================
  const setProperty = (
    setProperty1: boolean,
    setProperty2: string,
    setProperty3: number
  ) => {
    setShowErrorApp(setProperty1);
    setResponseServer(setProperty2);
    setStatusCode(setProperty3);
    setLoader(false);
  };

  // Работа с сервером + получения результата
  // =======================================
  const handleSignup = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    // Проверка валидности входных данных
    // ==================================
    if (!firstName || !lastName || !email || !password) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Установка кнопки загрузка
    // ========================
    setLoader(true);

    // Запрос к серверу
    // ================
    const { status, data } = await signupAPI(
      firstName,
      lastName,
      email,
      password
    );

    // Получения токена JWT
    // ====================
    if (status === 201) {
      // Показ уведомления
      // Успешная регестрация
      // ==================
      setProperty(true, "Successful registration!", status);

      // Переход на главную страницу
      // ===========================
      setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_CLIENT_URI}/signin`;
      }, 2000);
    } else {
      // Показ уведомления ошибка
      // ==================
      console.log(status, data.error);
      setProperty(true, data.error, status);
    }
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    responseServer,
    statusCode,
    loader,
    showErrorApp,
    handleSignup,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <SignupContext.Provider value={contextValue}>
        {children}
      </SignupContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useSignupContext = () => useContext<context>(SignupContext);
