import gsap from "gsap";
import { Check, Plus } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CreateWeb from "./CreateWeb";
import React from "react";
import { useWebListContext } from "../../context/WebListContext";
import ErrorWindow from "../ErrorWindow";

const WebList = () => {
  const { sites, responseServer, statusCode, showErrorWindow, handleWebList } =
    useWebListContext();

  const { siteName } = useParams();

  const openCreateWeb = () => {
    gsap.to("#create_web_popUp", 0.2, {
      display: "flex",
    });
  };

  React.useEffect(() => {
    handleWebList();
  }, []);

  return (
    <>
      {/* Показ ошибки */}
      {showErrorWindow && (
        <ErrorWindow message={responseServer} status_code={statusCode} />
      )}

      <CreateWeb />

      <div className="absolute top-[4rem] left-[140px] z-10">
        <div className="bg-[#13111c] w-[250px] min-h-[150px] rounded-lg border border-[#33323e]">
          <div className="p-3">
            <p className="text-[#a1a0ab] text-[12px] mb-2">Websites</p>
            {sites.map((site: any, index: number) => (
              <Link to={"/dashboard/" + site.name} key={index}>
                <div
                  className={`mb-2 flex items-center ${
                    siteName === site.name ? "bg-[#1f132a]" : ""
                  } p-2 rounded-md hover:bg-[#211f2d]`}
                >
                  <Check
                    style={
                      siteName === site.name ? { opacity: 1 } : { opacity: 0 }
                    }
                    color="#a667e4"
                    size={16}
                  />
                  <p className="text-[#a667e4] text-[14px] ml-3">{site.name}</p>
                </div>
              </Link>
            ))}
            <div className="h-[1px] w-full bg-[#33323e] mt-4 mb-3"></div>
            <div onClick={openCreateWeb} className="cursor-pointer">
              <div className="flex items-center p-2 rounded-md hover:bg-[#211f2d]">
                <Plus color="#853bce" size={16} />
                <p className="text-[#853bce] text-[14px] ml-3">New WebSite</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebList;
