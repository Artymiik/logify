import { ChevronDown } from "lucide-react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { DetailInfo, InstallLibrary, StartedLibrary } from "../types/started";
import { useState } from "react";

const Index = () => {
  const [contentOpenNPM, setContentOpenNPM] = useState<boolean>(false);
  const [contentOpenStarted, setContentOpenStarted] = useState<boolean>(false);
  const [contentOpenIP_GPS, setContentOpenIP_GPS] = useState<boolean>(false);

  const [language, setLanguage] = useState<string>("js");
  const changeLanguage = (languageSet: string) => {
    setLanguage(languageSet);
    InstallLibrary(language);
  };

  // --------------------------
  // styles css
  // --------------------------
  const upStr = {
    transform: "rotate(0)",
    width: "20px",
    transition: "0.3s",
  };
  const downStr = {
    transform: "rotate(-180deg)",
    width: "20px",
    transition: "0.3s",
  };

  return (
    <>
      <Navigation />

      <div className="h-screen">
        <div className="flex flex-col justify-center h-full mx-[5vw]">
          <div>
            <p className="text-[3.5rem] font-bold max-w-[70vw] tracking-wide">
              Simple and Free Logging for Your Applications
            </p>
            <p className="text-[1.5rem] text-[#878593] max-w-[60vw] mb-10">
              Create, customize, edit and download logs via the website or
              directly in React
            </p>
            <Link
              to=""
              className="bg-[#850ac2] p-3 px-8 rounded-lg text-[#fff] font-semibold hover:text-[#fff] hover:border hover:border-[#fff] transitions"
            >
              Start a New project
            </Link>
          </div>
          <div></div>
        </div>
      </div>

      <div className="mx-[19vw]">
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <p
              id="text__number__blue"
              className="bg-[#0f1b33] text-[#306ee8] text-[2rem] font-semibold flex items-center justify-center border-2 w-[70px] h-[70px] border-[#306ee8] p-2 rounded-[50%] mb-3"
            >
              1
            </p>
            <p
              id="text__description_blue__1"
              className="text-[#306ee8] font-semibold text-[1.5rem] tracking-wide my-3 mb-0"
            >
              Opportunities logify
            </p>
            <p
              id="text__title__1"
              className="text-[#fff] text-[2rem] font-bold mb-3 tracking-wide"
            >
              logify - library for logging
            </p>
            <div className="h-[2px] bg-[#306ee8] w-[15vw]"></div>
            <p
              id="text__description__1"
              className="text-center text-[#b8b8b8] max-w-[70vw] my-[2rem] tracking-wide"
            >
              Easily keep logs on your server using the Logify library for
              different programming languages. Free subscription for 1 month!
            </p>

            <div
              id="blocks__grid__index"
              className="grid grid-cols-2 gap-[20px]"
            >
              <div className="bg-[transparent] p-5 m-2 border border-[#306ee8] rounded">
                <p className="text-[#8caef2]">For each language</p>
                <p className="text-[#a1a0ab] text-[0.8rem] mt-4 tracking-wide">
                  Choose a language for your project. logify - works with many
                  languages
                </p>
              </div>
              <div className="bg-[transparent] p-5 m-2 border border-[#306ee8] rounded">
                <p className="text-[#8caef2]">Easy to use</p>
                <p className="text-[#a1a0ab] text-[0.8rem] mt-4 tracking-wide">
                  Logify is designed for quick and easy use.
                </p>
              </div>
              <div className="bg-[transparent] p-5 m-2 border border-[#306ee8] rounded">
                <p className="text-[#8caef2]">Free subscription</p>
                <p className="text-[#a1a0ab] text-[0.8rem] mt-4 tracking-wide">
                  Try Logify for free for 1 month. You have $5 available, which
                  allows you to use logify for 1 month
                </p>
              </div>
              <div className="bg-[transparent] p-5 m-2 border border-[#306ee8] rounded">
                <p className="text-[#8caef2]">Without breaking my head</p>
                <p className="text-[#a1a0ab] text-[0.8rem] mt-4 tracking-wide">
                  Don't bother logging and creating logs, just use logify
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center text-center my-[10vw]">
        <div className="max-w-[40vw]">
          <p className="text-[3rem] mb-[1rem] tracking-wide">
            Logify know about <span>everything and everyone!</span>
          </p>
          <p className="text-center text-[17px] tracking-wide text-[#acacac]">
            Create, customize, edit and download logs via the website or
            directly in React
          </p>
        </div>
      </div> */}
      {/* <div className="flex justify-center">
        <div>
          <img
            src="/screen-index.png"
            className="border border-[#333] rounded-lg w-[850px]"
            alt=""
          />
        </div>
      </div> */}

      <div className="mt-[15vw]">
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <p
              id="text__number__green"
              className="bg-[#15231d] text-[#42946e] text-[2rem] font-semibold flex items-center justify-center border-2 w-[70px] h-[70px] border-[#42946e] p-2 rounded-[50%] mb-3"
            >
              2
            </p>
            <p
              id="text__description_green__2"
              className="text-[#42946e] font-semibold text-[1.5rem] tracking-wide my-3 mb-0"
            >
              Get started logify
            </p>
            <p
              id="text__title__2"
              className="text-[#fff] text-[2rem] font-bold mb-3 tracking-wide"
            >
              Installing and configuring the project on
            </p>
            <div className="h-[2px] bg-[#42946e] w-[15vw]"></div>
            <p
              id="text__description__2"
              className="text-center text-[#b8b8b8] max-w-[70vw] my-[2rem] tracking-wide"
            >
              To configure and install, select the programming language that
              will be used in the project
            </p>
            <div className="flex w-full items-center justify-between mt-2">
              <p
                id="language__block"
                className="text-[#e8ca30] bg-[#32330f] hover:bg-[#4e4f26] transition border border-[#e8ca30] p-2 min-w-[10vw] flex justify-center rounded cursor-pointer"
                onClick={() => changeLanguage("js")}
              >
                JavaScript
              </p>
              <p
                id="language__block"
                className="text-[#fff] bg-[#0f1f33] hover:bg-[#1f344d] transition border border-[#fff] p-2 min-w-[10vw] flex justify-center rounded cursor-pointer"
                onClick={() => changeLanguage("ts")}
              >
                TypeScript
              </p>
              <p
                id="language__block"
                className="text-[#8230e8] bg-[#1e0f33] hover:bg-[#2b1b40] transition border border-[#8230e8] p-2 min-w-[10vw] flex justify-center rounded cursor-pointer"
                onClick={() => changeLanguage("c#")}
              >
                C#
              </p>
              <p
                id="language__block"
                className="text-[#306ee8] bg-[#0f1b33] hover:bg-[#1d2f54] transition border border-[#306ee8] p-2 min-w-[10vw] flex justify-center rounded cursor-pointer"
                onClick={() => changeLanguage("golang")}
              >
                Golang
              </p>
            </div>

            <div>
              {InstallLibrary(language)?.map((item, index) => (
                <div
                  key={index}
                  id="info__block"
                  className="border w-[65vw] border-[#333] p-6 rounded-lg cursor-pointer my-[2vw] mt-[3vw]"
                >
                  <div
                    className="flex items-center justify-between"
                    onClick={() => setContentOpenNPM(!contentOpenNPM)}
                  >
                    <p>{item.title}</p>
                    <ChevronDown style={!contentOpenNPM ? upStr : downStr} />
                  </div>

                  <div
                    className={`mt-[2rem] transition ${
                      contentOpenNPM ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-[14px] text-[#acacac]">{item.install}</p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code_install}</code>
                      </pre>
                    </div>
                    <p className="text-[14px] text-[#acacac] mt-5">
                      {item.import}
                    </p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code_import}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
              {StartedLibrary(language)?.map((item, index) => (
                <div
                  key={index}
                  className="border w-[65vw] border-[#333] p-6 rounded-lg cursor-pointer my-[2vw]"
                  id="info__block"
                >
                  <div
                    className="flex items-center justify-between"
                    onClick={() => setContentOpenStarted(!contentOpenStarted)}
                  >
                    <p>{item.title}</p>
                    <ChevronDown
                      style={!contentOpenStarted ? upStr : downStr}
                    />
                  </div>

                  <div
                    className={`mt-[2rem] transition ${
                      contentOpenStarted ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-[14px] text-[#acacac]">
                      {item.description}
                    </p>
                    <p className="bg-[#853DCE] inline-block text-[#fff] mt-[1.55rem] text-[12px] px-3 py-2 rounded-md cursor-pointer hover:bg-[#A667E4] transition">
                      Copy connect link
                    </p>
                    <p className="text-[14px] text-[#acacac] mt-5">
                      {item.description2}
                    </p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code}</code>
                      </pre>
                    </div>
                    <p className="text-[14px] text-[#acacac] mt-5">
                      {item.started}
                    </p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code_started}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
              {DetailInfo(language)?.map((item, index) => (
                <div
                  key={index}
                  className="border w-[65vw] border-[#333] p-6 rounded-lg cursor-pointer my-[2vw]"
                  id="info__block"
                >
                  <div
                    className="flex items-center justify-between"
                    onClick={() => setContentOpenIP_GPS(!contentOpenIP_GPS)}
                  >
                    <p>{item.title}</p>
                    <ChevronDown style={!contentOpenIP_GPS ? upStr : downStr} />
                  </div>

                  <div
                    className={`mt-[2rem] transition ${
                      contentOpenIP_GPS ? "block" : "hidden"
                    }`}
                  >
                    <p className="text-[14px] text-[#acacac]">
                      {item.description}
                    </p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code_ip_gps}</code>
                      </pre>
                    </div>
                    <p className="text-[14px] text-[#acacac] mt-5">
                      {item.description2}
                    </p>
                    <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
                      <pre>
                        <code className="text-[14px]">{item.code_started}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="my-[10vw] mx-[10vw]">
        <p className="text-[25px]">How to connect?</p>

        <div className="border border-[#333] p-6 rounded-lg cursor-pointer my-[2vw]">
          <div
            className="flex items-center justify-between"
            onClick={() => setContentOpenIP_GPS(!contentOpenIP_GPS)}
          >
            <p>IPAddress and GPS</p>
            <ChevronDown style={!contentOpenIP_GPS ? upStr : downStr} />
          </div>

          <div
            className={`mt-[2rem] transition ${
              contentOpenIP_GPS ? "block" : "hidden"
            }`}
          >
            <p className="text-[14px] text-[#acacac]">
              To connect and interact with your log, click on the button in the
              dashboard to copy the unique uuid of the log
            </p>
            <div className="bg-[#ffffff05] p-5 rounded-md mt-5">
              <pre>
                <code className="text-[14px]">{env_code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Index;
