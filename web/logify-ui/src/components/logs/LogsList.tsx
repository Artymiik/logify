import { EllipsisVertical, ShieldCheck } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateLog_Btn from "./CreateLog_Btn";
import React from "react";
import { TypesLog } from "../../types/types";
import Cookies from "js-cookie";
import axios from "axios";

const LogsList = () => {
  const [logs, setLogs] = React.useState<TypesLog[]>([]);
  const { siteName } = useParams();

  React.useEffect(() => {
    const logsSubmit = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/${siteName}/logs`,
        {
          headers: {
            Authorization: Cookies.get("OAuth"),
          },
        }
      );

      setLogs(response.data);
    };

    logsSubmit();
  }, []);

  return (
    <>
      <div>
        {/* BLOCK */}
        {logs.map((log: any, index: number) => (
          <Link to={`/dashboard/${siteName}/${log.name}`} key={index}>
            <div className="border text-[#fff] hover:text-[#fff] mt-8 p-1 rounded-md border-[#1c362a]">
              <div className="flex justify-between items-center bg-[#161d1a] p-4 rounded-md cursor-pointer">
                <div className="flex items-center">
                  <p className="bg-[#1c362a] text-[#42946e] text-2xs font-semibold px-2 py-1 rounded-md">
                    ACTIVE
                  </p>
                  <div className="flex items-center ml-5">
                    <ShieldCheck strokeWidth={1.75} size={28} />
                    <div className="ml-2">
                      <p className="text-[14px] mb-1">{log.name}</p>
                      <p className="text-[12px] text-[#979797]">
                        {log.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-[14px] border hover:bg-[#15231d] transition border-[#1c362a] px-2 py-1 rounded-md text-[#42946e] mr-3 flex items-center justify-center">
                    View logs
                  </p>
                  <EllipsisVertical size={16} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CreateLog_Btn />
    </>
  );
};

export default LogsList;
