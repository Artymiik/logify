import { ChevronDown, User } from "lucide-react";
import WebList from "./web/WebList";
import React from "react";

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      {/* Навигация */}
      <div className="border-b border-[#211f2d] mb-5">
        <div className="flex items-center my-5 mx-10 justify-between">
          <div className="flex items-center">
            {/* Лого */}
            <p className="text-xl">
              Log<span className="text-[#42946e] tracking-wider">ify</span>
            </p>
            <p className="mx-4 text-[#333333]">/</p>
            <div
              className="flex items-center cursor-pointer relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              {/* Название проекта лога */}
              <p className="tracking-wider hover:text-[#ddd] transition">artemiik-portfolio</p>
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
            <div className="bg-[#161d1a] mr-4 px-2 py-1.5 flex items-center text-[#42946e] rounded-md text-2xs cursor-pointer">
              <p className="font-bold">TRIAL</p>
              <p className="mx-2 text-3xs">|</p>
              <p className="font-semibold">$ 5.00</p>
            </div>
            {/* User */}
            <User
              color="#ffffff"
              strokeWidth={1.5}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
