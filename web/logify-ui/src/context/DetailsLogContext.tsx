import { createContext, useContext, useState } from "react";
import { detailsLogAPI } from "../api/logs/details-log-api.POST";
import { ResponseDetailsLog } from "../types/types";

// интерфейс контекста
// ===================
interface context {
  returnsDetailsLog: ResponseDetailsLog[];
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleDetailsLog: (siteName: string, logName: string) => void;
}

// инициализация контекста
// =======================
const DetailsLogContext = createContext<context>({
  returnsDetailsLog: [] as ResponseDetailsLog[], // пустой объект для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleDetailsLog: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const DetailsLogProvider = ({ children }: any) => {
  // use states
  // ===================
  const [returnsDetailsLog, setReturnsDetailsLog] = useState<
    ResponseDetailsLog[]
  >([] as ResponseDetailsLog[]);
  const [responseServer, setResponseServer] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>(400);
  const [showErrorWindow, setShowErrorWindow] = useState<boolean>(false);

  // Функция для работы с показом уведомлением
  // =========================================
  const setProperty = (
    setProperty1: boolean,
    setProperty2: string,
    setProperty3: number
  ) => {
    setShowErrorWindow(setProperty1);
    setResponseServer(setProperty2);
    setStatusCode(setProperty3);
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleDetailsLog = async (siteName: string, logName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await detailsLogAPI(siteName, logName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    setReturnsDetailsLog(JSON.parse(data));
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    returnsDetailsLog,
    responseServer,
    statusCode,
    showErrorWindow,
    handleDetailsLog,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <DetailsLogContext.Provider value={contextValue}>
        {children}
      </DetailsLogContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useDetailsLogContext = () =>
  useContext<context>(DetailsLogContext);
