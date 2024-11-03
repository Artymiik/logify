import { lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useSigninContext } from "../context/SigninContext";
import ErrorWindow from "../components/ErrorWindow";
// import Loader from "../components/Loader/Loader";
const Loader = lazy(() => import("../components/Loader/Loader"));

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { responseServer, statusCode, loader, showErrorApp, handleSignin } =
    useSigninContext();

  const signinSubmit = () => {
    handleSignin(email, password);
  };

  return (
    <>
      {showErrorApp && (
        <ErrorWindow message={responseServer} status_code={statusCode} />
      )}

      <div className="bg-[#0b0a0f] h-screen">
        <div className="h-full flex items-center justify-center flex-col">
          <div className="bg-[#13111c] w-[25rem] h-[23rem] rounded-lg p-5 flex flex-col justify-center">
            <p className="text-center text-[1.2rem] mb-7 -mt-10">
              Sign in to logify
            </p>
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
              onClick={signinSubmit}
            >
              {loader ? <Loader /> : "Sign in Here"}
            </button>
            <div>
              <div className="h-[1px] bg-[#333] w-full"></div>
              <Link to="/signup">
                <p className="text-[#fff] text-[12px] text-center font-light mt-5 -mb-[3rem]">
                  No account? Register
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
