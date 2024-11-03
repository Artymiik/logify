import gsap from "gsap";
import { CreditCard, KeyRound, LogOut } from "lucide-react";
import { signoutAPI } from "../../api/auth/signout-api.GET";
import { lazy } from "react";
const Conects_Window = lazy(() => import("./Conects_Window"));

const UserActions = () => {
  const OpenConectAction = () => {
    gsap.to("#conect_action_window", 0.1, {
      display: "flex",
    });
  };

  return (
    <>
      <Conects_Window />

      <div id="user_action" className="absolute z-10">
        <div className="bg-[#13111c] w-[250px] min-h-[150px] rounded-lg border border-[#33323e]">
          <div className="p-3">
            <div
              className="flex items-center cursor-pointer p-2 rounded-md hover:bg-[#211f2d]"
              onClick={OpenConectAction}
            >
              <KeyRound size={18} color="#fff" />
              <p className="text-[#fff] text-[14px] ml-3">Conects</p>
            </div>
            <div className="flex items-center cursor-pointer p-2 rounded-md hover:bg-[#211f2d] mt-2">
              <CreditCard size={18} color="#fff" />
              <p className="text-[#fff] text-[14px] ml-3">Buy</p>
            </div>
            <div className="flex items-center cursor-pointer p-2 rounded-md bg-[#1f132a] hover:bg-[#211f2d] mt-2">
              <LogOut size={18} color="#ff4242" />
              <p
                className="text-[#ff4242] text-[14px] ml-3"
                onClick={() => {
                  signoutAPI();
                  window.location.reload();
                }}
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserActions;
