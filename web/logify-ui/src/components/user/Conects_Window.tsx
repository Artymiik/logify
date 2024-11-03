import { ArrowRight, CheckCheck, Copy, X } from "lucide-react";
import { useConectsContext } from "../../context/ConectsContext";
import { useEffect, useState } from "react";
import ErrorWindow from "../ErrorWindow";
import gsap from "gsap";

const Conects_Window = () => {
  const [conectInput, setConectInput] = useState<string>("");

  const {
    conects,
    responseServer,
    statusCode,
    showErrorWindow,
    handleHistoryConects,
    handleActiveConect,
  } = useConectsContext();

  const closeConectAction = () => {
    gsap.to("#conect_action_window", 0.1, {
      display: "none",
    });
  };

  useEffect(() => {
    handleHistoryConects();
  }, []);

  return (
    <>
      {/* ERROR */}
      {showErrorWindow && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      {/* <ErrorWindow status_code={statusCode} message={responseServer} /> */}

      <div
        id="conect_action_window"
        className="hidden fixed top-0 left-0 z-[100] bg-[#0000008c] h-screen w-screen flex flex-col items-center justify-center"
      >
        <div className="fixed bg-[#181622] min-w-[50vw] border border-[#33323e] rounded-lg p-3">
          <X
            size={18}
            color="#a1a0ab"
            className="mb-3 mt-1 cursor-pointer w-[197%] flex justify-end"
            onClick={closeConectAction}
          />
          <div>
            <p className="text-[#a1a0ab] text-[12px] mb-2">
              Activating the conect
            </p>
            <div className="flex items-center">
              <input
                type="text"
                className="w-full p-3 bg-[transparent] mr-3 border border-[#33323e] rounded outline-none mb-2 text-[13px]"
                value={conectInput}
                onChange={(e) => setConectInput(e.target.value)}
              />
              <button
                className="bg-[#fff] -mt-2 py-[0.65rem]"
                onClick={() => handleActiveConect(conectInput)}
              >
                <ArrowRight strokeWidth={1.5} size={20} />
              </button>
            </div>
            <p className="text-[#a1a0ab] text-[12px] mt-3">History</p>

            {conects.length > 0 ? (
              conects.map((conect, index) => (
                <div id="HistoryConect" key={index}>
                  <div className="flex items-center justify-between">
                    <div className="mt-3">
                      <p
                        className={`whitespace-nowrap overflow-hidden truncate max-w-[250px] text-[${
                          conect.status == "used" ? "#a1a0ab" : "#fff"
                        }] text-[12px] mt-1 text-[14px]`}
                      >
                        {conect.conect}
                      </p>
                      <p
                        className={`text-[${
                          conect.status == "used" ? "#a1a0ab" : "#fff"
                        }] text-[12px] mt-1`}
                      >
                        {conect.createdAt}
                      </p>
                    </div>
                    <div>
                      {conect.status == "used" ? (
                        <CheckCheck
                          className="cursor-pointer text-[#a1a0ab] transition"
                          size={20}
                        />
                      ) : (
                        <Copy
                          className="cursor-pointer text-[#fff] hover:text-[#a1a0ab] transition"
                          size={20}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div id="NotFoundedConect" className="text-center">
                <span className="text-[4vw]">🤷‍♂️</span>
                <p className="my-3 text-[#a1a0ab]">
                  the history of the conects is empty
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conects_Window;
