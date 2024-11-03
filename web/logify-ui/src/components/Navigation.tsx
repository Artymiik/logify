import { ChevronDown, User } from "lucide-react";
import { lazy, useEffect, useState } from "react";
import { getBalanceAPI } from "../api/transaction/get-balance-api.GET";
import ErrorWindow from "./ErrorWindow";
import { Link, useParams } from "react-router-dom";

const UserActions = lazy(() => import("./user/UserActions"));
const MoneyDetails = lazy(() => import("./user/MoneyDetails"));
const WebList = lazy(() => import("./web/WebList"));

const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenMoney, setIsOpenMoney] = useState<boolean>(false);
  const [isOpenUser, setIsOpenUser] = useState<boolean>(false);

  const [balance, setBalance] = useState<number>(0);
  const [webTitle, setWebTitle] = useState<string>("Choose web");
  const [errorShowWindow, setErrorShowWindow] = useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<number>(400);
  const [responseServer, setResponseServer] = useState<string>("");

  const { siteName } = useParams();

  const handleToggle = (
    isOpen: boolean,
    isOpenMoney: boolean,
    isOpenUser: boolean
  ) => {
    setIsOpen(isOpen);
    setIsOpenMoney(isOpenMoney);
    setIsOpenUser(isOpenUser);
  };

  useEffect(() => {
    setWebTitle(siteName ? siteName : "Choose web");

    const get = async () => {
      const { status, data } = await getBalanceAPI();

      if (status >= 400) {
        setResponseServer(data.error);
        setStatusCode(status);
        setErrorShowWindow(true);
        return;
      }

      setErrorShowWindow(false);
      setStatusCode(status);
      setBalance(data);
    };

    get();
  }, []);

  return (
    <>
      {errorShowWindow && (
        <ErrorWindow status_code={statusCode} message={responseServer} />
      )}

      {/* Навигация */}
      <div id="navigation" className="border-b border-[#211f2d] mb-5">
        <div className="flex items-center my-5 mx-10 justify-between">
          <div className="flex items-center">
            {/* Лого */}
            <p className="text-xl cursor-pointer">
              <Link
                to="/"
                className="text-[#fff] hover:text-[#fff] tracking-wider"
              >
                .log<span className="text-[#850ac2] tracking-wider">ify</span>
              </Link>
            </p>
            <p className="mx-4 text-[#333333]">/</p>
            <div
              className="flex items-center cursor-pointer relative"
              onClick={() => handleToggle(!isOpen, false, false)}
            >
              {/* Название проекта лога */}
              <p className="tracking-wider hover:text-[#ddd] transition">
                {webTitle}
              </p>
              {isOpen ? (
                <ChevronDown
                  size={16}
                  color="#BAB5E8"
                  strokeWidth={1.5}
                  className="ml-1 rotate-[180deg] transition"
                />
              ) : (
                <ChevronDown
                  size={16}
                  color="#BAB5E8"
                  strokeWidth={1.5}
                  className="ml-1 transition"
                />
              )}
            </div>
            {isOpen && <WebList />}
          </div>
          <div className="flex items-center">
            {/* Цена */}
            <div
              id="money_details"
              className="bg-[#161d1a] mr-4 px-2 py-1.5 flex items-center text-[#42946e] rounded-md text-2xs cursor-pointer"
              onClick={() => handleToggle(false, !isOpenMoney, false)}
            >
              <p className="font-bold">TRIAL</p>
              <p className="mx-2 text-3xs">|</p>
              <p className="font-semibold">$ {balance.toFixed(2)}</p>
            </div>
            {isOpenMoney && <MoneyDetails money={balance} />}
            {/* User */}
            <User
              color="#ffffff"
              strokeWidth={1.5}
              className="cursor-pointer"
              onClick={() => handleToggle(false, false, !isOpenUser)}
            />
            {isOpenUser && <UserActions />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
