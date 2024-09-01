import { CircleUser, Globe, House } from "lucide-react";
import "./NavigatorDash.sass";
import { Link } from "react-router-dom";

export const NavigatorDash = () => {
  return (
    <>
      <div id="header__dashboard__nav">
        <div className="elements__header__dash">
          <div className="left">
            <p>
              Log<span>ify</span>
            </p>
          </div>
          <div className="right">
            <CircleUser className="icon-user-dash" />
          </div>
        </div>
      </div>

      <div id="dashboard__navigator">
        <div className="elements__dashboard__navigator">
          <Link to="/dashboard" className="dashboard__nav">
            <House className="icon-home-dash" />
            <p>Dashboard</p>
          </Link>

          <Link to="/sites" className="dashboard__nav">
            <Globe className="icon-sites-dash" />
            <p>Sites</p>
          </Link>
        </div>
      </div>
    </>
  );
};
