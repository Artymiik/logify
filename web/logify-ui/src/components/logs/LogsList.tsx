import { EllipsisVertical, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateLog_Btn from "./CreateLog_Btn";
import CreateLog_Window from "./CreateLog_Window";
import gsap from "gsap";
import { useLogListAndDeleteContext } from "../../context/LogListAndDeleteContext";
import ErrorWindow from "../ErrorWindow";
import { lazy, useEffect, useState } from "react";
const LogActions = lazy(() => import("./LogActions"));

const LogsList = () => {
  const [showActionLog, setShowActionLog] = useState<boolean[]>([]);
  const { siteName } = useParams();

  const {
    logs,
    responseServer,
    statusCode,
    showErrorWindow,
    handleLogList,
    handleLogDelete,
    handleDownloadLog,
  } = useLogListAndDeleteContext();

  const openWindowCreateLog = () => {
    gsap.to("#windowCreateLog", 0.1, {
      display: "flex",
    });
  };

  const openActionLog = (index: number) => {
    setShowActionLog((prevShowActionLog) => {
      const newShowActionLog = [...prevShowActionLog];

      newShowActionLog[index] = !newShowActionLog[index];
      return newShowActionLog;
    });
  };

  useEffect(() => {
    handleLogList(siteName ? siteName : "");
  }, []);

  return (
    <>
      {/* ERROR */}
      {showErrorWindow && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      {/* CREATE LOG */}
      <CreateLog_Window />

      <div>
        {/* BLOCK */}
        {logs.map((log: any, index: number) => (
          <div key={index}>
            <Link
              to={`/dashboard/${siteName}/${log.name}`}
              key={index}
              className="absolute left-10 w-[40vw] h-[10vh] rounded-lg"
            ></Link>
            <div
              className="border text-[#fff] hover:text-[#fff] mt-8 p-1 rounded-md"
              style={{
                border:
                  log.status == "active"
                    ? "1px solid #1c362a"
                    : "1px solid #361c1c",
              }}
            >
              <div
                className="flex justify-between items-center p-4 rounded-md cursor-pointer"
                style={{
                  background: log.status == "active" ? "#161d1a" : "#1d1616",
                }}
              >
                <div className="flex items-center">
                  <p
                    className="text-2xs font-semibold px-2 py-1 rounded-md"
                    style={{
                      color: log.status == "active" ? "#42946e" : "#944242",
                      background:
                        log.status == "active" ? "#1c362a" : "#361c1c",
                    }}
                  >
                    ACTIVE
                  </p>
                  <div className="flex items-center ml-5">
                    <ShieldCheck strokeWidth={1.75} size={22} />
                    <div className="ml-2">
                      <p className="text-[14px] mb-1 font-light">{log.name}</p>
                      <p className="text-[12px] text-[#979797]">
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <p
                    onClick={() =>
                      (window.location.href = `${
                        import.meta.env.VITE_CLIENT_URI
                      }/dashboard/${siteName}/${log.name}/log`)
                    }
                    className={`text-[14px] border hover:bg-[${
                      log.status == "active" ? "#15231d" : "#944242"
                    }] transition px-2 py-1 rounded-md mr-3 flex items-center justify-center`}
                    style={{
                      color: log.status == "active" ? "#42946e" : "#944242",
                      border:
                        log.status == "active"
                          ? "1px solid #1c362a"
                          : "1px solid #361c1c",
                    }}
                  >
                    View logs
                  </p>
                  <EllipsisVertical
                    size={16}
                    className="cursor-pointer"
                    onClick={() => openActionLog(index)}
                  />
                </div>
              </div>
            </div>
            {showActionLog[index] && (
              <LogActions
                siteName={siteName}
                logName={log.name}
                action={handleLogDelete}
                download={handleDownloadLog}
              />
            )}
          </div>
        ))}
      </div>
      <span onClick={openWindowCreateLog}>
        <CreateLog_Btn />
      </span>
    </>
  );
};

export default LogsList;
