import { lazy, useEffect, useState } from "react";
import { useDetailsLogContext } from "../../context/DetailsLogContext";
import ErrorWindow from "../ErrorWindow";
import { useParams } from "react-router-dom";
import { SquarePlus } from "lucide-react";
const ShowMoreDetails = lazy(() => import("./ShowMoreDetails"));
import NavigationInLog from "../NavigationInLog";
import gsap from "gsap";

const DetailsLogData = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { siteName, logName } = useParams();

  // инициализируем переменные из контекста
  const {
    returnsDetailsLog,
    responseServer,
    statusCode,
    showErrorWindow,
    handleDetailsLog,
  } = useDetailsLogContext();

  // открытие/закрытие деталий лога
  const openDetailsLog = (index: number) => {
    if (isOpen) {
      gsap.to(`#details-log-${index}`, 0.1, {
        display: "none",
      });

      setIsOpen(false);
    } else {
      gsap.to(`#details-log-${index}`, 0.1, {
        display: "block",
      });

      setIsOpen(true);
    }
  };

  useEffect(() => {
    handleDetailsLog(siteName ? siteName : "", logName ? logName : "");
  }, []);

  return (
    <>
      {showErrorWindow && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      {/* Навигация */}
      <NavigationInLog />

      {/* Детали лога */}
      <div className="bg-[#13111c] absolute left-0 mt-7 h-full border border-[#33323e] w-full overflow-auto">
        <div className="mt-10 overflow-auto">
          {returnsDetailsLog.map((log, index) => (
            <div
              className={`my-[0.2rem] ${
                Number(log.statusCode) >= 400 ? "bg-[#211]" : ""
              } px-3 py-[2px] ${
                Number(log.statusCode) >= 400
                  ? "hover:bg-[#2c1111]"
                  : "hover:bg-[#181622]"
              } transition`}
              key={index}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <SquarePlus
                    size={14}
                    strokeWidth={1.5}
                    className="mr-8 text-[#444] hover:text-[#fff] cursor-pointer"
                    onClick={() => openDetailsLog(index)}
                  />
                  <div
                    className={`${
                      Number(log.statusCode) >= 400
                        ? "bg-[#741d1b]"
                        : "bg-[#183367]"
                    } w-[8px] cursor-pointer ${
                      Number(log.statusCode) >= 400
                        ? "hover:bg-[#b62d2b]"
                        : "hover:bg-[#294e94]"
                    } transition h-[18px] rounded-[3px]`}
                  ></div>
                  <p className="text-[12px] ml-3 text-[#878593]">
                    {log.timestamp}
                  </p>
                  <p className="text-[12px] ml-3 text-[#fff]">
                    {log.responseMessage}
                  </p>
                </div>
                <div>
                  {Number(log.statusCode) >= 400 ? (
                    <p className="text-[11px] ml-3 text-[#944242] bg-[#350808] px-2 rounded">
                      {log.statusCode}
                    </p>
                  ) : (
                    <p className="text-[11px] ml-3 text-[#42946e] bg-[#161d1a] px-2 rounded">
                      {log.statusCode}
                    </p>
                  )}
                </div>
              </div>
              {/* CONTENT */}
              <ShowMoreDetails detailsLog={returnsDetailsLog} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailsLogData;
