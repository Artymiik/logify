import React from "react";
import Confetti from "react-confetti";
import { Link, useParams } from "react-router-dom";
import { getLogAPI } from "../api/getLog-api";

const NavigationInLog = () => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const [uniqueClient, setUniqueClient] = React.useState<string>("");
  const { siteName, logName } = useParams();

  // Массив с пунктами навигации
  const NavigateLog = [
    {
      ID: 1,
      Title: "Details",
      Path: "/",
    },
    {
      ID: 2,
      Title: "Build Logs",
      Path: "/",
    },
    {
      ID: 3,
      Title: "Settings",
      Path: `/dashboard/${siteName}/${logName}/settings`,
    },
  ];

  // Функция для копирования uniqueClient
  const handleCopied = (uniqueClient: string) => {
    navigator.clipboard
      .writeText(uniqueClient)
      .then(() => {
        setCopied(true);
        console.log(uniqueClient);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Ошибка копирования:", err);
      });
  };

  // Отправка запрос на сервер
  // Для получения uniqueClient
  React.useEffect(() => {
    const uniqueClientGet = async () => {
      try {
        const { status, data } = await getLogAPI(
          siteName ? siteName : "",
          logName ? logName : ""
        );

        if (status >= 400) {
          return;
        }

        setUniqueClient(data.log.uniqueClient);
      } catch (err) {
        console.log(err);
      }
    };

    uniqueClientGet();
  }, []);

  return (
    <>
      {/* Показ анимации копирования текста */}
      {copied && <Confetti />}

      <div className="flex items-center justify-between">
        <div className="mt-8 inline-block flex items-center">
          <div
            id="indicator"
            className="bg-[#2c4c3d] w-[9px] h-[9px] rounded-xl"
          ></div>
          <p className="ml-2 text-[16px] text-[#ddd]">{logName}</p>
        </div>
        <div>
          <p
            className="bg-[#853DCE] text-[#ff] text-[12px] px-3 py-2 rounded-md cursor-pointer hover:bg-[#A667E4] transition"
            onClick={() => handleCopied(uniqueClient)}
          >
            Copy connect link
          </p>
        </div>
      </div>

      <div className="flex items-center mt-10">
        {NavigateLog.map((el, index) => (
          <div key={index} className="mr-3">
            <Link
              to={el.Path}
              className="text-[#fff] text-[15px] px-3 py-2 rounded transition hover:bg-[#211F2D] hover:text-[#fff]"
            >
              {el.Title}
            </Link>
          </div>
        ))}
      </div>
      {/* Линия */}
      <div className="h-[1px] absolute w-full -ml-10 bg-[#33323e] my-7"></div>
    </>
  );
};

export default NavigationInLog;
