import React from "react";
import { Link } from "react-router-dom";
import { useSignupContext } from "../context/SignupContext";
import ErrorWindow from "../components/ErrorWindow";

export const Signup = () => {
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

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
                  Welcome, register to your account
                </p>
                <div>
                  <div className="mt-5">
                    <p className="text-[#000] text-[12px] ml-3">
                      First name and Last name
                    </p>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="bg-[#ddd] mr-4 text-[15px] p-2 pl-3 outline-none rounded-3xl mt-1 text-[#000] w-[170px]"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        className="bg-[#ddd] text-[15px] p-2 pl-3 outline-none rounded-3xl mt-1 text-[#000] w-[170px]"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
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
                    className="bg-[#091a10] text-[#fff] my-5 mb-4 rounded-3xl py-3 px-5 hover:bg-[#0e2c1a] transition"
                    onClick={signupSubmit}
                  >
                    Sign up Here
                  </button>
                </div>
                <div>
                  <div className="h-[1px] bg-[#ddd] w-full"></div>
                  <Link to="/signin">
                    <p className="text-[#000] text-[12px] mt-4">
                      Have account? Login
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
