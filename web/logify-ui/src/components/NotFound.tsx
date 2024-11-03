import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen items-center justify-center">
        <div className="text-center">
          <span id="not__found__icon" className="text-[8vw]">
            🤷‍♂️
          </span>
          <p id="not__found__mainText" className="text-[2vw] mb-3 mt-5">
            The page was not found or does not exist
          </p>
          <Link id="not__found__link" to="/" className="text-[#6e6e6e]">
            Go back to the main page
          </Link>
        </div>
      </div>
    </>
  );
};
