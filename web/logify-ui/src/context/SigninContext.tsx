import React from "react";
import Cookies from "js-cookie";
import { signinAPI } from "../api/signin-api";

// интерфейс контекста
// ===================
interface context {
  responseServer: string;
  statusCode: number;
  loader: boolean;
  showErrorApp: boolean;
  handleSignin: (email: string, password: string) => void;
}

// инициализация контекста
// =======================
const SigninContext = React.createContext<context>({
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  loader: false, // значение по умолчанию для loader
  showErrorApp: false, // значение по умолчанию для showErrorWindow
  handleSignin: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const SigninProvider = ({ children }: any) => {
  // use states
  // ===================
  const [loader, setLoader] = React.useState<boolean>(false);
  const [responseServer, setResponseServer] = React.useState<string>("");
  const [statusCode, setStatusCode] = React.useState<number>(400);
  const [showErrorApp, setShowErrorApp] = React.useState<boolean>(false);

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
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleSignin = async (email: string, password: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!email || !password) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Установка кнопки загрузка
    // ========================
    setLoader(true);

    // Запрос к серверу
    // ================
    const { status, data } = await signinAPI(email, password);

    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Сохранение токена в куки
    // ========================
    const now_cookie = new Date();
    Cookies.set("OAuth", data.token, {
      expires: new Date(now_cookie.getTime() + 9 * 60 * 60 * 1000),
    });

    // Показ уведомления
    // Успешный вход
    // ==================
    setProperty(true, "Successful login!", status);

    // Переход на главную страницу
    // ===========================
    setTimeout(() => {
      window.location.href = `${import.meta.env.VITE_CLIENT_URI}/`;
    }, 2000);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    responseServer,
    statusCode,
    loader,
    showErrorApp,
    handleSignin,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <SigninContext.Provider value={contextValue}>
        {children}
      </SigninContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useSigninContext = () => React.useContext<context>(SigninContext);
