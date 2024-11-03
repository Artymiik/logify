import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useSignupContext } from "../context/SignupContext";
import ErrorWindow from "../components/ErrorWindow";
// import Loader from "../components/Loader/Loader";
const Loader = lazy(() => import("../components/Loader/Loader"));

export const Signup = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { responseServer, statusCode, loader, showErrorApp, handleSignup } =
    useSignupContext();

  const signupSubmit = () => {
    handleSignup(firstName, lastName, email, password);
  };

  return (
    <>
      {showErrorApp && (
        <ErrorWindow message={responseServer} status_code={statusCode} />
      )}

      <div className="bg-[#0b0a0f] h-screen">
        <div className="h-full flex items-center justify-center flex-col">
          <div className="bg-[#13111c] w-[25rem] h-[28rem] rounded-lg p-5 flex flex-col justify-center">
            <p className="text-center text-[1.2rem] mb-7 -mt-10">
              Sign up to logify
            </p>
            <div className="flex items-center mb-5">
              <input
                type="text"
                className="bg-[transparent] border border-[#656565] text-[14px] p-3 pl-3 outline-none rounded-xl text-[#fff] w-full mr-5"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                className="bg-[transparent] border border-[#656565] text-[14px] p-3 pl-3 outline-none rounded-xl text-[#fff] w-full"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              className="bg-[transparent] border border-[#656565] text-[14px] p-3 pl-3 outline-none rounded-xl text-[#fff] w-full"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="bg-[transparent] border border-[#656565] text-[14px] mt-5 p-3 pl-3 outline-none rounded-xl mt-1 text-[#fff] w-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full flex justify-center bg-[#fff] text-[#000] my-5 mb-10 rounded-xl py-3 px-5 hover:bg-[#cdcdcd] transition text-[12px]"
              onClick={signupSubmit}
            >
              {loader ? <Loader /> : "Sign up Here"}
            </button>
            <div>
              <div className="h-[1px] bg-[#333] w-full"></div>
              <Link to="/signin">
                <p className="text-[#fff] text-[12px] text-center font-light mt-5 -mb-[3rem]">
                  Have account? Login
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
