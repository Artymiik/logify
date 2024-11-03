import { TypesLog } from "../types/types";
import { settingsAPI } from "../api/logs/settings-api.GET";
import { SettingsData } from "../components/settings/settings_data";
import { settingsSetAPI } from "../api/logs/settings.set-api.PUT";
import { createContext, useContext, useState } from "react";

// интерфейс контекста
// ===================
interface context {
  settings: TypesLog;
  responseServer: string;
  statusCode: number;
  showErrorWindow: boolean;
  handleSettings: (siteName: string, logName: string) => void;
  handleSettingsUpdate: (
    settingData: any,
    siteName: string,
    logName: string
  ) => void;
}

// инициализация контекста
// =======================
const SettingsContext = createContext<context>({
  settings: {} as TypesLog, // пустой объект для log
  responseServer: "", // пустая строка для responseServer
  statusCode: 404, // значение по умолчанию для statusCode
  showErrorWindow: false, // значение по умолчанию для showErrorWindow
  handleSettings: () => {}, // пустая функция по умолчанию
  handleSettingsUpdate: () => {}, // пустая функция по умолчанию
});

// провайдер для использования в отдельных файлов
// ==============================================
export const SettingsProvider = ({ children }: any) => {
  // use states
  // ===================
  const [settings, setSettings] = useState<TypesLog>(Object);
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
  const handleSettings = async (siteName: string, logName: string) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    // Запрос к серверу
    // ================
    const { status, data } = await settingsAPI(siteName, logName);

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    // Установка settings значений в settings_data.ts
    // ==============================================
    SettingsData.forEach((set) => {
      set.Value = data.settings[set.Name];
    });

    // Если все ОК, устанавливаем значения
    // ===================================
    setSettings(data);
  };

  // Раота с сервером + получения результата
  // =======================================
  const handleSettingsUpdate = async (
    settingData: any,
    siteName: string,
    logName: string
  ) => {
    // Проверка валидности входных данных
    // ==================================
    if (!siteName || !logName) {
      setProperty(true, "invalid payload!", 400);
      return;
    }

    const typeSettings = settingData.reduce((acc: any, curr: any) => {
      acc[curr.Name] = curr.Value;
      return acc;
    }, {} as Record<string, boolean>);

    // Запрос к серверу
    // ================
    const { status, data } = await settingsSetAPI(
      typeSettings,
      siteName,
      logName
    );

    // Показ ошибки
    // ====================
    if (status >= 400) {
      setProperty(true, data.error, status);
      return;
    }

    setProperty(true, data, status);
  };

  // Установка значений в контекст
  // =============================
  const contextValue: context = {
    settings,
    responseServer,
    statusCode,
    showErrorWindow,
    handleSettings,
    handleSettingsUpdate,
  };

  // Вывод компонента с контекстом
  // =============================
  return (
    <>
      <SettingsContext.Provider value={contextValue}>
        {children}
      </SettingsContext.Provider>
    </>
  );
};

// Получение контекста в компонентах
// =================================
export const useSettingsContext = () => useContext<context>(SettingsContext);
