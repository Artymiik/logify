import React from "react";
import { TypesSite } from "../types/types";
import { webListAPI } from "../api/webList-api";

// интерфейс контекста
// ===================
interface context {
  sites: TypesSite[];
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleWebList: () => void;
}

// инициализация контекста
// =======================
const WebListContext = React.createContext<context>({
  sites: [] as TypesSite[], // пустой массив для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleWebList: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const WebListProvider = ({ children }: any) => {
  // use states
  // ===================
  const [sites, setSites] = React.useState<TypesSite[]>([]);
  const [responseServer, setResponseServer] = React.useState<string>("");
  const [statusCode, setStatusCode] = React.useState<number>(400);
  const [showErrorWindow, setShowErrorWindow] = React.useState<boolean>(false);

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
  const handleWebList = async () => {
    // Запрос к серверу
    // ================
    const { status, data } = await webListAPI();

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    setSites(data);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    sites,
    responseServer,
    statusCode,
    showErrorWindow,
    handleWebList,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <WebListContext.Provider value={contextValue}>
        {children}
      </WebListContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useWebListContext = () =>
  React.useContext<context>(WebListContext);
