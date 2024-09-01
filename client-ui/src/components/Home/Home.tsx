import "./Home.sass";
import { animateHome } from "../animations/animateHome";
import { Link } from "react-router-dom";
import { Header } from "../Header/Header";
import { FolderCog, Laptop, Mouse, ShieldAlert, Zap } from "lucide-react";
import React from "react";

export const Home = () => {
  React.useEffect(() => {
    animateHome();
  }, []);

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

          <img src="/index_img.png" alt="" />
        </div>
      </div>

      <div id="info__logify">
        <div className="elements__info__logify">
          <p className="title__ingo__logify">
            The main features provided by the logify library are
          </p>
          <p className="description__info__logify">
            logify-react allows you to interact with logs directly in the
            console
          </p>
          <Link to="/signin" className="bntClick__info__logify">
            Click this Button
          </Link>
        </div>
      </div>

      <div id="logidy__specials">
        <div className="elements__special">
          {/* BLOCK TOP */}
          <div className="blocks__top__special">
            {/* BLOCK 1 */}
            <div className="block__one">
              <div className="title__block__special">
                <Mouse className="icon__block" />
                <p>Ease of use</p>
              </div>
              <p className="description__block__special">
                Logify is designed with ease of use in mind. You can create,
                edit and download .log files in just a few clicks.
              </p>
            </div>
            <div className="line-block"></div>
            {/* BLOCK 2 */}
            <div className="block__two">
              <div className="title__block__special">
                <Laptop className="icon__block" />
                <p>Intuitive interface</p>
              </div>
              <p className="description__block__special">
                Logify components have an intuitive interface that makes it easy
                to interact with .log files.
              </p>
            </div>
            <div className="line-block"></div>
            {/* BLOCK 3 */}
            <div className="block__three">
              <div className="title__block__special">
                <ShieldAlert className="icon__block" />
                <p>Safety</p>
              </div>
              <p className="description__block__special">
                Logify ensures the security of your .log files by ensuring that
                only authorized users have access to them.
              </p>
            </div>
          </div>
          <div className="line__bt"></div>
          {/* BLOCK BOTTOM */}
          <div className="blocks__bottom__special">
            {/* BLOCK 1 */}
            <div className="block__one">
              <div className="title__block__special">
                <FolderCog className="icon__block" />
                <p>Flexibility</p>
              </div>
              <p className="description__block__special">
                Logify is easily customized to your needs, allowing you to
                control the process of storing and managing .log files.
              </p>
            </div>
            <div className="line-block"></div>
            {/* BLOCK 2 */}
            <div className="block__two">
              <div className="title__block__special">
                <Zap className="icon__block" />
                <p>High performance</p>
              </div>
              <p className="description__block__special">
                Logify is optimized for maximum performance, providing fast
                creation, reading and writing of .log files.
              </p>
            </div>
            <div className="line-block"></div>
            {/* BLOCK 3 */}
            <div className="block__three">
              <div className="title__block__special">
                <ShieldAlert className="icon__block" />
                <p>Safety</p>
              </div>
              <p className="description__block__special">
                Logify ensures the security of your .log files by ensuring that
                only authorized users have access to them.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
