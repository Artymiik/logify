import { Link } from "react-router-dom";
import "./Header.sass";

export const Header = () => (
  <>
    <div id="header">
      <div className="elements__header">
        <div className="left">
          <p>
            Log<span>ify</span>
          </p>
        </div>
        <div className="right">
          <Link to="/signin">Sign in</Link>
          <Link to="/signin">Sign up</Link>
        </div>
      </div>
    </div>
  </>
);
