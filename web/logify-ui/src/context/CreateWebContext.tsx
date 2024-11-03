import { createContext, useContext, useState } from "react";
import { createWebAPI } from "../api/web/create-web-api.POST";

// интерфейс контекста
// ===================
interface context {
  responseServer: string;
  statusCode: number;
  loader: boolean;
  showErrorApp: boolean;
  handleCreateWeb: (name: string, description: string, link: string) => void;
}

// инициализация контекста
// =======================
const CreateWebContext = createContext<context>({
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  loader: false, // значение по умолчанию для loader
  showErrorApp: false, // значение по умолчанию для showErrorWindow
  handleCreateWeb: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const CreateWebProvider = ({ children }: any) => {
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
  const handleCreateWeb = async (
    name: string,
    description: string,
    link: string
  ) => {
    // Проверка валидности входных данных
    // ==================================
    if (!name || !description || !link) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Установка кнопки загрузка
    // ========================
    setLoader(true);

    // Запрос к серверу
    // ================
    const { status, data } = await createWebAPI(name, description, link);

    if (status >= 400) {
      // Показ уведомления ошибка
      // ==================
      setProperty(true, data.error, status);
      return;
    }

    // Показ уведомления
    // Успешная регестрация
    // ====================
    sessionStorage.removeItem("sites");
    setProperty(true, data, status);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    responseServer,
    statusCode,
    loader,
    showErrorApp,
    handleCreateWeb,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <CreateWebContext.Provider value={contextValue}>
        {children}
      </CreateWebContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useCreateWebContext = () => useContext<context>(CreateWebContext);
