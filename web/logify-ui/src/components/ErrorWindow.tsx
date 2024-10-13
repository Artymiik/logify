import gsap from "gsap";
import { CircleCheck, CircleX } from "lucide-react";
import React from "react";

interface Props {
  message: string;
  status_code: number;
}

const ErrorWindow = (props: Props) => {
  const statusCode = props.status_code.toString();

  React.useEffect(() => {
    gsap.to("#error-window", 0.2, {
      opacity: 1,
      y: 0,
    });

    setTimeout(() => {
      gsap.to("#error-window", 0.2, { opacity: 0, y: -60 });
    }, 2500);
  }, [props.status_code]);

  return (
    <>
      <div id="error-window" className="fixed left-[37vw] top-10 w-screen flex z-[1000]">
        {statusCode.startsWith("4") ? (
          <div className="flex items-center bg-[#ad000030] px-5 py-3 rounded-3xl">
            <CircleX color="#f00" size={18} />
            <p className="ml-2 text-[#f00] text-[15px] max-w-[50vw]">
              {props.message}
            </p>
          </div>
        ) : statusCode.startsWith("5") ? (
          <div className="flex items-center bg-[#ad000030] px-5 py-3 rounded-3xl">
            <CircleX color="#f00" size={18} />
            <p className="ml-2 text-[#f00] text-[15px] max-w-[50vw]">
              {props.message}
            </p>
          </div>
        ) : (
          <div className="flex items-center bg-[#07ad0030] px-5 py-3 rounded-3xl">
            <CircleCheck color="#03d933" size={18} />
            <p className="ml-2 text-[#03d933] text-[15px] max-w-[50vw]">
              {props.message}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ErrorWindow;
