import "./Home.sass";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";

export const Home = () => {
  return (
    <>
      <Header />

      <div id="index">
        <div className="elements__index">
          <p className="el__mini__description">
            A cloud server for storing your logs
          </p>
          <h1 className="title__index">
            Logify know about <span>everything and everyone!</span>
          </h1>
          <p className="description__index">
            Create, customize, edit and download logs via the website or
            directly in React
          </p>
          <div className="bottom__btn__blocks">
            <Link to="/signin" className="signin__btn__index">
              Sign in
            </Link>
            <Link to="/signup" className="signup__btn__index">
              Start logging
            </Link>
          </div>
        </div>
      </div>

      <div id="img__index__info">
        <div className="elements__index__info__img">
          <div className="fire__specials__left"></div>
          <div className="fire__specials__right"></div>

          <img src="/index__info.png" alt="" />
        </div>
      </div>
    </>
  );
};
