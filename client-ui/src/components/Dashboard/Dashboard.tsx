import { NavigatorDash } from "../NavigatorDash/NavigatorDash";
import { CirclePlus, File } from "lucide-react";
import "./Dashboard.sass";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <div id="dashboard">
        <div className="elements__dashboard">
          <div className="left">
            <NavigatorDash />
          </div>

          <div className="right">
            {/* --------------------
            Скрипт если нет сайтов
            -------------------- */}
            <div className="not__have__sites" style={{ display: "none" }}>
              <div className="elements__not__have__site">
                <File className="icon-file" />
                <p className="title__not__sites">
                  You dont have any Sites created
                </p>
                <p className="description__not__sites">
                  You don't have any websites. Create a website to keep logs. To
                  create logs, create your own website
                </p>
                <Link
                  className="btn-create-site-not"
                  to="/dashboard/create/site"
                >
                  <div className="el-btn-not">
                    <CirclePlus size={16} />
                    <p>Create Site</p>
                  </div>
                </Link>
              </div>
            </div>
            {/* --------------------------
            Если есть сайты
            -------------------------- */}
            <div className="my__sites__list">
              <div className="elements__my__sites__list">
                <p className="title__my__sites__list">Web Sites</p>
                <p className="description__my__sites__list">
                  Manage your Web-sites in a simple and intuitive interface
                </p>

                <div className="line__first__list__sites"></div>
                {/* mapping user sitest */}
                <div className="list__all__my__header">
                  <Link to="/dashboard/name-site">
                    <div className="list__header__my__sites">
                      <p className="title__list__my__sites__header">
                        Artemiik-portfolio
                      </p>
                      <p className="description__list__my__sites__header">
                        My web-site for portfolio web-developer and search my
                        first work
                      </p>
                      <p className="status__list__my__sites__header">
                        Published
                      </p>
                      <p className="logs__list__my__sites__header">Logs: 0</p>
                    </div>
                    <div className="line__last__sites__list"></div>
                  </Link>

                  <Link to="/dashboard/name-site">
                    <div className="list__header__my__sites">
                      <p className="title__list__my__sites__header">
                        Artemiik-portfolio
                      </p>
                      <p className="description__list__my__sites__header">
                        My web-site for portfolio web-developer and search my
                        first work
                      </p>
                      <p className="status__list__my__sites__header">
                        Published
                      </p>
                      <p className="logs__list__my__sites__header">Logs: 0</p>
                    </div>
                    <div className="line__last__sites__list"></div>
                  </Link>

                  <Link to="/dashboard/name-site">
                    <div className="list__header__my__sites">
                      <p className="title__list__my__sites__header">
                        Artemiik-portfolio
                      </p>
                      <p className="description__list__my__sites__header">
                        My web-site for portfolio web-developer and search my
                        first work
                      </p>
                      <p className="status__list__my__sites__header">
                        Published
                      </p>
                      <p className="logs__list__my__sites__header">Logs: 0</p>
                    </div>
                    <div className="line__last__sites__list"></div>
                  </Link>

                  <Link to="/dashboard/name-site">
                    <div className="list__header__my__sites">
                      <p className="title__list__my__sites__header">
                        Artemiik-portfolio
                      </p>
                      <p className="description__list__my__sites__header">
                        My web-site for portfolio web-developer and search my
                        first work
                      </p>
                      <p className="status__list__my__sites__header">
                        Published
                      </p>
                      <p className="logs__list__my__sites__header">Logs: 0</p>
                    </div>
                    <div className="line__last__sites__list"></div>
                  </Link>
                </div>
              </div>
            </div>

            {/* -----------------------------
            Создания ссылки на сайт popUp
            ----------------------------- */}
            <div className="popUp-create-site" style={{ display: "none" }}>
              <div className="elements__create__site">
                <p className="title__create__site">Create Site</p>
                <p className="description__create__site">
                  Create your Site here. Click the button bellow once your
                  done...
                </p>

                <div className="input__box">
                  <p>Site Name</p>
                  <input
                    type="text"
                    name="siteName"
                    placeholder="Title web site"
                  />
                </div>

                <div className="input__box">
                  <p>Description</p>
                  <textarea
                    name="siteDescription"
                    placeholder="Small Description for your site"
                  />
                </div>

                <div className="input__box">
                  <p>link to the website</p>
                  <input
                    type="text"
                    name="siteLink"
                    placeholder="Insert the link"
                  />
                </div>

                <div className="btn__create__site">
                  <button>Create Site</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
