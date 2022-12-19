import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { TopbarData } from "./TopbarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { GeneralContext } from "../../contexts/GeneralContext";
import LogoIcon from "../../assets/icons/LogoIcon";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { user, setUser } = useContext(GeneralContext);

  const showSidebar = () => setSidebar(!sidebar);

  const logoutUser = () => {
    setUser("");
    window.location.replace("/login");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h2 className="logo">hoursON</h2>
          {user && (
            <ul className="nav-menu-items1">
              {TopbarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName} onClick={logoutUser}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
