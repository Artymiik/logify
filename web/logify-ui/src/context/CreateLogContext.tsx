import { createContext, useContext, useState } from "react";
import { createLogAPI } from "../api/logs/create-log-api.POST";

// интерфейс контекста
// ===================
interface context {
  responseServer: string;
  statusCode: number;
  loader: boolean;
  showErrorApp: boolean;
  handleCreateLog: (
    siteName: string,
    name: string,
    router: string,
    category: string
  ) => void;
}

// инициализация контекста
// =======================
const CreateLogContext = createContext<context>({
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  loader: false, // значение по умолчанию для loader
  showErrorApp: false, // значение по умолчанию для showErrorWindow
  handleCreateLog: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const CreateLogProvider = ({ children }: any) => {
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
  const handleCreateLog = async (
    siteName: string,
    name: string,
    router: string,
    category: string
  ) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !name || !router) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Установка кнопки загрузка
    // ========================
    setLoader(true);

    // Запрос к серверу
    // ================
    const { status, data } = await createLogAPI(
      siteName,
      name,
      router,
      category
    );

    if (status >= 400) {
      // Показ уведомления ошибка
      // ==================
      setProperty(true, data.error, status);
      return;
    }

    // Показ уведомления
    // Успешная регестрация
    // ====================
    setProperty(true, data, status);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    responseServer,
    statusCode,
    loader,
    showErrorApp,
    handleCreateLog,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <CreateLogContext.Provider value={contextValue}>
        {children}
      </CreateLogContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useCreateLogContext = () => useContext<context>(CreateLogContext);
