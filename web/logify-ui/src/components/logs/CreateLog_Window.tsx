import gsap from "gsap";
import { Bolt, Fingerprint, ShieldQuestion, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCreateLogContext } from "../../context/CreateLogContext";
import { lazy, useState } from "react";
import ErrorWindow from "../ErrorWindow";
const Loader = lazy(() => import("../Loader/Loader"));

const CreateLog_Window = () => {
  const [category, setCategory] = useState<string>("");

  const [fields, setFields] = useState({
    name: "",
    router: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { siteName } = useParams();
  const { responseServer, statusCode, showErrorApp, loader, handleCreateLog } =
    useCreateLogContext();

  const closeWindowCreateLog = () => {
    gsap.to("#windowCreateLog", 0.1, {
      display: "none",
    });
  };

  const fieldsFilled = Object.values(fields).every(
    (field) => field.trim() !== ""
  );

  const createLog = () => {
    handleCreateLog(
      siteName ? siteName : "",
      fields.name,
      fields.router,
      category
    );
  };

  return (
    <>
      {showErrorApp && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      <div
        id="windowCreateLog"
        className="hidden bg-[#00000089] fixed top-0 left-0 w-screen h-screen z-[100] flex flex-col justify-center items-center"
      >
        <div
          id="create__log__window"
          className="bg-[#13111c] flex flex-col justify-center p-5 rounded-[10px] w-[45vw]"
        >
          <X
            className="items-end mb-5 cursor-pointer"
            size={17}
            color="#444"
            onClick={closeWindowCreateLog}
          />
          <div className="flex flex-col mt-4">
            <input
              type="text"
              placeholder="title log"
              className="tracking-wide bg-[transparent] border border-[#33323e] p-3 rounded-[10px] text-[13px] outline-none"
              name="name"
              value={fields.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="router (signin)"
              className="tracking-wide mt-3 bg-[transparent] border border-[#33323e] p-3 rounded-[10px] text-[13px] outline-none"
              name="router"
              value={fields.router}
              onChange={handleChange}
            />
          </div>
          <div
            id="blocks__category__log"
            className="flex items-center justify-between mt-4"
          >
            <div
              id="block__category__log__1"
              className={`bg-[${
                category == "Safety" ? "#fff" : "transparent"
              }] text-[${
                category == "Safety" ? "#000" : ""
              }] cursor-pointer mr-6 p-3 border border-[#33323e] rounded-lg text-center flex flex-col items-center hover:bg-[#fff] hover:text-[#000] transition`}
              onClick={() => {
                setCategory("Safety");
              }}
            >
              <ShieldQuestion className="mb-3" strokeWidth={1.5} size={35} />
              <p className="text-[12px] text-center max-w-[7rem] text-balance">
                A ready-made log for your security
              </p>
            </div>
            <div
              id="block__category__log__2"
              className={`bg-[${
                category == "Authenticate" ? "#fff" : "transparent"
              }] text-[${
                category == "Authenticate" ? "#000" : ""
              }] cursor-pointer mr-6 p-3 border border-[#33323e] rounded-lg text-center flex flex-col items-center hover:bg-[#fff] hover:text-[#000] transition`}
              onClick={() => {
                setCategory("Authenticate");
              }}
            >
              <Fingerprint strokeWidth={1.5} className="mb-3" size={35} />
              <p className="text-[12px] text-center max-w-[7.5rem] text-balance">
                A ready-made log for auth app
              </p>
            </div>
            <div
              id="block__category__log__3"
              className={`bg-[${
                category == "Customized" ? "#fff" : "transparent"
              }] text-[${
                category == "Customized" ? "#000" : ""
              }] cursor-pointer p-3 border border-[#33323e] rounded-lg text-center flex flex-col items-center hover:bg-[#fff] hover:text-[#000] transition`}
              onClick={() => {
                setCategory("Customized");
              }}
            >
              <Bolt className="mb-3" strokeWidth={1.5} size={35} />
              <p className="text-[12px] text-center max-w-[7rem] text-balance">
                Set up your own log yourself
              </p>
            </div>
          </div>
          <button
            style={{
              opacity: fieldsFilled ? 1 : 0.3,
              pointerEvents: fieldsFilled ? "all" : "none",
            }}
            className="flex justify-center items-center h-[43px] bg-[#fff] hover:bg-[#dedede] transition text-[#000] text-[14px] mt-5 rounded-[7px] font-normal p-[2.5]"
            onClick={createLog}
          >
            {loader ? <Loader /> : "Create Log"}
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateLog_Window;
