import { Link } from "react-router-dom";
import "./Signup.sass";

export const Signup = () => {
  return (
    <>
      <div id="signin">
        <div className="elements__signin">
          <h2 className="title__signin">
            <span>Welcome developer!</span> Sign up
          </h2>

          <div className="flex__name__signup">
            <div className="input__box">
              <input
                type="text"
                name="firstName"
                className="firstName"
                required
              />
              <label className="firstNameLabel">first name</label>
            </div>

            <div className="input__box">
              <input
                type="text"
                name="lastName"
                className="firstName"
                required
              />
              <label className="lastNameLabel">last name</label>
            </div>
          </div>

          <div className="input__box">
            <input type="email" name="email" required />
            <label>email</label>
          </div>

          <div className="input__box">
            <input
              type="password"
              name="password"
              className="password-input"
              required
            />
            <label>password</label>
          </div>

          <button>Sign up</button>
          <p className="not-account">
            Have account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </>
  );
};
