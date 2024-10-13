import { ArrowDown } from "lucide-react";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <>
      <Navigation />

      <div className="flex justify-center text-center my-[10vw]">
        <div className="max-w-[40vw]">
          <p className="text-[3rem] mb-[1rem] tracking-wide">
            Logify know about <span>everything and everyone!</span>
          </p>
          <p className="text-center text-[17px] tracking-wide text-[#acacac]">
            Create, customize, edit and download logs via the website or
            directly in React
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <img
            src="/public/screen-index.png"
            className="border border-[#333] rounded-lg w-[850px]"
            alt=""
          />
        </div>
      </div>

      <div className="my-[10vw] mx-[10vw]">
        <p className="text-[25px]">How to connect?</p>

        <div className="border border-[#333] p-6 rounded-lg cursor-pointer my-[3vw]">
          <div className="flex items-center justify-between">
            <p>Install NPM Package</p>
            <ArrowDown />
          </div>

          <div className="mt-[2rem]">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              obcaecati earum! Quaerat incidunt reprehenderit est? Praesentium,
              porro nesciunt amet excepturi, vero accusamus ex sed in sequi
              blanditiis ad ducimus voluptas?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              obcaecati earum! Quaerat incidunt reprehenderit est? Praesentium,
              porro nesciunt amet excepturi, vero accusamus ex sed in sequi
              blanditiis ad ducimus voluptas?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              obcaecati earum! Quaerat incidunt reprehenderit est? Praesentium,
              porro nesciunt amet excepturi, vero accusamus ex sed in sequi
              blanditiis ad ducimus voluptas?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
