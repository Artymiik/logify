import gsap from "gsap";
import { Code, Info } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";
import { useLogDetailsContext } from "../../context/LogDetailsContext";
import ErrorWindow from "../ErrorWindow";
import NavigationInLog from "../NavigationInLog";

export const LogDetails = () => {
  // states
  // ======
  const { siteName, logName } = useParams();
  const {
    codeConnectLog,
    responseServer,
    statusCode,
    showErrorWindow,
    handleLogDetails,
  } = useLogDetailsContext();

  // Отправка на сервер и анимации
  // =============================
  React.useEffect(() => {
    // анимация
    // ========
    const tl = gsap.timeline({ repeat: -1 });

    tl.to("#indicator", 2.5, {
      background: "#2c4c3d",
    }).to("#indicator", 1, {
      background: "#368660",
    });

    handleLogDetails(siteName ? siteName : "", logName ? logName : "");
  }, []);

  return (
    <>
      {/* Показ ошибки */}
      {showErrorWindow && (
        <ErrorWindow message={responseServer} status_code={statusCode} />
      )}

      <div>
        {/* Навигация */}
        <NavigationInLog />
        {/* Конфигурация */}
        <div className="mt-12 flex items-center justify-between">
          <p className="text-[14px]">Configuration</p>
          <div className="border-[1px] border-[#33323e] rounded cursor-pointer px-[16px] py-[6px] flex items-center">
            <Code size={14} />
            <p className="text-[14px] ml-2">Code</p>
          </div>
        </div>
        {/* Информация */}
        <div className="bg-[#0F1B33] flex items-center p-3 rounded-md mt-5">
          <Info color="#2767E7" size={17} />
          <p className="text-[#9CB3E3] text-[13px] ml-2">
            Use the code below to interact with the log.
          </p>
        </div>
        {/* Код */}
        <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
          <pre>
            <code>{codeConnectLog}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
