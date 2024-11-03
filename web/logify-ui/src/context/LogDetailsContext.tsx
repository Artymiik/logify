import { createContext, useContext, useState } from "react";
import { getLogAPI } from "../api/logs/get-log-api.GET";
import { TypesLog } from "../types/types";

// интерфейс контекста
// ===================
interface context {
  log: TypesLog;
  uniqueClient: string;
  codeConnectLog: string;
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleLogDetails: (siteName: string, logName: string) => void;
}

// инициализация контекста
// =======================
const LogDetailsContext = createContext<context>({
  log: {} as TypesLog, // пустой объект для log
  uniqueClient: "", // пустая строка для uniqueClient
  codeConnectLog: "", // пустая строка для code
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleLogDetails: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const LogDetailsProvider = ({ children }: any) => {
  // use states
  // ===================
  const [log, setLog] = useState<TypesLog>(Object);
  const [uniqueClient, setUniqueClient] = useState<string>("");
  const [codeConnectLog, setCodeConnectLog] = useState<string>("");
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
  const handleLogDetails = async (siteName: string, logName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await getLogAPI(siteName, logName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    setUniqueClient(data.log.uniqueClient);
    setCodeConnectLog(data.code);
    setLog(data.log);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    log,
    uniqueClient,
    codeConnectLog,
    responseServer,
    statusCode,
    showErrorWindow,
    handleLogDetails,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <LogDetailsContext.Provider value={contextValue}>
        {children}
      </LogDetailsContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useLogDetailsContext = () =>
  useContext<context>(LogDetailsContext);
