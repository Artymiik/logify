import { Link } from "react-router-dom";
import "./Header.sass";

export const Header = () => (
  <>
    <div id="header">
      <div className="elements__header">
        <div className="left">
          <p className="logo">
            Log<span>ify</span>
          </p>
        </div>
        <div className="right">
          <Link to="/signin" className="signin__header">Sign in</Link>
          <Link to="/signin" className="signup__header">Sign up</Link>
        </div>
      </div>
    </div>
  </>
);
