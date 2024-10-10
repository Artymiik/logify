import gsap from "gsap";
import { X } from "lucide-react";
import React from "react";

const CreateWeb = () => {
  const [fields, setFields] = React.useState({
    name: "",
    description: "",
    link: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const fieldsFilled = Object.values(fields).every(
    (field) => field.trim() !== ""
  );

  const closeCreateWeb = () => {
    gsap.to("#create_web_popUp", 0.2, {
      display: "none",
    });
  };

  return (
    <div
      id="create_web_popUp"
      className="z-[12] fixed top-0 left-0 w-screen h-screen bg-[#0000009e] flex items-center justify-center flex-col hidden"
    >
      <div className="p-5 bg-[#181622] rounded-lg">
        <div className="flex items-center justify-between">
          <p className="font-medium text-[20px]">New WebSite</p>
          <X size={17} className="cursor-pointer" onClick={closeCreateWeb} />
        </div>
        <p className="max-w-[45vw] mb-5 mt-3 text-[#878593] text-[14px]">
          Connect your site to link your logs to it in the future. Connect an
          active site with an active link, non-active sites will not connect!
        </p>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Name WebSite"
            className="my-2 p-3 tracking-wide rounded-md outline-none border border-[#33323e] bg-[transparent] text-[13px]"
            name="name"
            value={fields.name}
            onChange={handleChange}
          />
          <textarea
            placeholder="Description"
            className="my-2 h-[10rem] resize-none p-3 tracking-wide rounded-md outline-none border border-[#33323e] bg-[transparent] text-[13px]"
            name="description"
            value={fields.description}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Paste Link..."
            className="my-2 p-3 text-[#3691e8] tracking-wide rounded-md outline-none border border-[#33323e] bg-[transparent] text-[13px]"
            name="link"
            value={fields.link}
            onChange={handleChange}
          />
        </div>
        <button
          style={{
            opacity: fieldsFilled ? 1 : 0.3,
            pointerEvents: fieldsFilled ? "all" : "none",
          }}
          className="bg-[#853bce] transition py-[10px] w-full mt-5 text-[#fff] text-[15px] font-medium"
        >
          Connect WebSite
        </button>
      </div>
    </div>
  );
};

export default CreateWeb;
