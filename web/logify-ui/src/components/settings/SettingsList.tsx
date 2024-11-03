import { lazy, useEffect, useState } from "react";
import { useSettingsContext } from "../../context/SettingsContext";
const NavigationInLog = lazy(() => import("../NavigationInLog"));
import { SettingsData } from "./settings_data";
import "./SettingsStyle.css";
import { useParams } from "react-router-dom";
import ErrorWindow from "../ErrorWindow";

const SettingsList = () => {
  // берём значения из URL
  const { siteName, logName } = useParams();

  // состояние для checked у checkbox
  const [settingData, setSettingData] = useState(SettingsData);

  // инициализируем переменные из контекста
  const {
    responseServer,
    statusCode,
    showErrorWindow,
    handleSettings,
    handleSettingsUpdate,
  } = useSettingsContext();

  // изменения состояния checkbox
  const handleCheckboxChange = (index: number) => {
    const updatedSettings = [...settingData];
    updatedSettings[index].Value = !updatedSettings[index].Value;
    setSettingData(updatedSettings);
  };

  // отправляем запрос в контекст
  useEffect(() => {
    handleSettings(siteName ? siteName : "", logName ? logName : "");
  }, []);

  return (
    <>
      {showErrorWindow && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      {/* Навигация */}
      <NavigationInLog />
      {/* Настройки */}
      <div className="mt-10">
        <div className="flex items-center flex-wrap justify-center">
          {SettingsData.map((data, index) => (
            <div
              id="blocks__settings"
              className="p-4 border border-[#33323e] rounded-xl m-2"
              key={index}
            >
              <p className="text-[15px] text-[#bdbdbd] tracking-wide">
                {data.Title}
              </p>
              <p
                id="settings__description"
                className="text-[12px] tracking-wide max-w-[12.5rem] my-4"
              >
                {data.Description}
              </p>
              <input
                type="checkbox"
                checked={data.Value}
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 right-10">
        <div
          className="bg-[#853bce] py-3 px-7 rounded-md cursor-pointer hover:bg-[#9654d7] transition"
          onClick={() =>
            handleSettingsUpdate(
              SettingsData,
              siteName ? siteName : "",
              logName ? logName : ""
            )
          }
        >
          <p className="text-[#fff] text-[14px]">Save settings</p>
        </div>
      </div>
    </>
  );
};

export default SettingsList;
