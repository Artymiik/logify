import { TypesSite } from "../types/types";
import { webListAPI } from "../api/web/webList-api.GET";
import { createContext, useContext, useState } from "react";

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
const WebListContext = createContext<context>({
  sites: [] as TypesSite[], // пустой массив для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 400, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleWebList: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const WebListProvider = ({ children }: any) => {
  // use states
  // ===================
  const [sites, setSites] = useState<TypesSite[]>([]);
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
  const handleWebList = async () => {
    // Проверка сессии
    const session = sessionStorage.getItem("sites");
    if (session) {
      setSites(JSON.parse(session));
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await webListAPI();

    // Показ ошибки
    // ====================
    if (status >= 400) {
      if (data.error == "you don't have any active sites") {
        setProperty(true, data.error, 100);
        return;
      }

      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    sessionStorage.setItem("sites", JSON.stringify(data));
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
export const useWebListContext = () => useContext<context>(WebListContext);
