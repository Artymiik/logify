import React from "react";
import { Link } from "react-router-dom";
import { useSigninContext } from "../context/SigninContext";
import ErrorWindow from "../components/ErrorWindow";

const Signin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
          <div className="bg-[#fff] w-[50rem] h-[32rem] rounded-lg">
            <div className="flex items-center">
              <div>
                <img
                  src="/public/bg-signin.jpg"
                  alt=""
                  className="rounded-l-lg w-[400px] h-[32rem] object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[#000] text-[40px] font-medium w-[340px]">
                  Welcome, login to your account
                </p>
                <div>
                  <div className="mt-5">
                    <p className="text-[#000] text-[12px] ml-3">
                      E-mail Address
                    </p>
                    <input
                      type="email"
                      className="bg-[#ddd] text-[15px] p-2 pl-3 outline-none rounded-3xl mt-1 text-[#000] w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-[#000] text-[12px] ml-3">Password</p>
                    <input
                      type="password"
                      className="bg-[#ddd] text-[15px] p-2 pl-3 outline-none rounded-3xl mt-1 text-[#000] w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-[#091a10] text-[#fff] my-5 mb-10 rounded-3xl py-3 px-5 hover:bg-[#0e2c1a] transition"
                    onClick={signinSubmit}
                  >
                    Sign in Here
                  </button>
                </div>
                <div>
                  <div className="h-[1px] bg-[#ddd] w-full"></div>
                  <Link to="/signup">
                    <p className="text-[#000] text-[12px] mt-5 -mb-[3rem]">
                      No account? Register
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
