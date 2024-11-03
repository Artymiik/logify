import { ConectType } from "../types/types";
import { getHistoryConectsAPI } from "../api/transaction/history-conects-api.GET";
import { activeConectAPI } from "../api/transaction/active-conect-api.POST";
import { createContext, useContext, useState } from "react";

// интерфейс контекста
// ===================
interface context {
  conects: ConectType[];
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleHistoryConects: () => void;
  handleActiveConect: (conect: string) => void;
}

// инициализация контекста
// =======================
const ConectsContext = createContext<context>({
  conects: [] as ConectType[], // пустой объект для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleHistoryConects: () => {}, // пустая функция по умолчанию
  handleActiveConect: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const ConectsProvider = ({ children }: any) => {
  // use states
  // ===================
  const [conects, setConects] = useState<ConectType[]>([]);
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
  const handleHistoryConects = async () => {
    // Запрос к серверу
    // ================
    const { status, data } = await getHistoryConectsAPI();

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК, устанавливаем значения
    // ===================================
    setConects(data);
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleActiveConect = async (conect: string) => {
    // Запрос к серверу
    // ================
    const { status, data } = await activeConectAPI(conect);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Если все ОК
    // ===================================
    setProperty(true, data, status);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    conects,
    responseServer,
    statusCode,
    showErrorWindow,
    handleHistoryConects,
    handleActiveConect,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <ConectsContext.Provider value={contextValue}>
        {children}
      </ConectsContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useConectsContext = () => useContext<context>(ConectsContext);
