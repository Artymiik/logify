import { PanelTop, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Panel_dashboard = ({ children }: any) => {
  const { siteName } = useParams();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <>
      {/* Панель */}
      <div id="__index__panel__dashboard" className="absolute right-0">
        <div id="panel__dashboard" className="bg-[#181622] h-[95vh] w-[52rem] rounded-xl border border-[#33323e] overflow-auto">
          {/* Верхушка */}
          <div className="m-10">
            <div className="flex tems-center justify-between">
              <p className="flex items-center text-xl font-semibold tracking-wide">
                <span className="mr-3">
                  <PanelTop strokeWidth={2} size={25} />
                </span>
                {siteName}
              </p>
              <span className="cursor-pointer" onClick={handleClose}>
                <X strokeWidth={1.5} size={17} />
              </span>
            </div>

            {/* Список логов или список содержимого логов */}
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel_dashboard;
