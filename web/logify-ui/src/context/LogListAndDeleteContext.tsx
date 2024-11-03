import { TypesLog } from "../types/types";
import { getLogsAPI } from "../api/logs/get-logs-api.GET";
import { deleteLogAPI } from "../api/logs/delete-log-api.DELETE";
import { downloadLogAPI } from "../api/logs/download-log-api.GET";
import { createContext, useContext, useState } from "react";

// интерфейс контекста
// ===================
interface context {
  logs: TypesLog[];
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleLogList: (siteName: string) => void;
  handleLogDelete: (siteName: string, logName: string) => void;
  handleDownloadLog: (siteName: string, logName: string) => void;
}

// инициализация контекста
// =======================
const LogListAndDeleteContext = createContext<context>({
  logs: [] as TypesLog[], // пустой объект для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleLogList: () => {}, // пустая функция по умолчанию
  handleLogDelete: () => {}, // пустая функция по умолчанию
  handleDownloadLog: () => {},
});

// провайдер для использования в отдельных файлов
// ==============================================
export const LogListAndDeleteProvider = ({ children }: any) => {
  // use states
  // ===================
  const [logs, setLogs] = useState<TypesLog[]>([]);
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
  const handleLogList = async (siteName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await getLogsAPI(siteName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      if (data.error == "you don't have any active logs") {
        setProperty(true, data.error, 100);
        return;
      }

      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    setLogs(data);
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleLogDelete = async (siteName: string, logName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await deleteLogAPI(siteName, logName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Все ОК
    // ===================================
    setProperty(true, "Log has been deleted!", 200);
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleDownloadLog = async (siteName: string, logName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await downloadLogAPI(siteName, logName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Все ОК
    // ===================================
    setProperty(true, "The log started downloading!", 200);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    logs,
    responseServer,
    statusCode,
    showErrorWindow,
    handleLogList,
    handleLogDelete,
    handleDownloadLog,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <LogListAndDeleteContext.Provider value={contextValue}>
        {children}
      </LogListAndDeleteContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useLogListAndDeleteContext = () =>
  useContext<context>(LogListAndDeleteContext);
