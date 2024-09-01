import { Link } from "react-router-dom";
import "./Signin.sass";
// import { HandleRequest } from "../HandleRequest/HandleRequest";

export const Signin = () => {
  return (
    <>
      <div id="signin">
        <div className="elements__signin">
          <h2 className="title__signin"><span>Hey developer!</span> Welcome back</h2>

          <div className="input__box">
            <input type="email" name="email" required />
            <label>email</label>
          </div>

          <div className="input__box">
            <input type="password" name="password" className="password-input" required />
            <label>password</label>
          </div>

          {/* <HandleRequest status_code={403} message="Error request" /> */}

          <button>Sign in</button>
          <p className="not-account">No account? <Link to="/signup">Create one</Link></p>
        </div>
      </div>
    </>
  )
}
