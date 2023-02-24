import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { TopbarData } from "./TopbarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { GeneralContext } from "../../contexts/GeneralContext";
import { toast } from "react-toastify";

function Navbar() {
  const [filteredData, setFilteredData] = useState([]);
  const { setUserData, user, userFirstName, userLastName, role } =
    useContext(GeneralContext);

  useEffect(() => {
    filteredSideData();
  }, [SidebarData]);

  const logoutUser = () => {
    setUserData("");
    notify();
    window.location.replace("/login");
  };

  const notify = () => {
    toast.info("You are logged out", { position: toast.POSITION.TOP_RIGHT });
  };

  const filteredSideData = () => {
    let arr = [];
    SidebarData.forEach((item) => {
      if (!item.protected) arr.push(item);
    });
    setFilteredData(arr);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <div className="logo-div">
            <img
              src="https://www.timetrackapp.com/wp-content/w3-webp/uploads/2021/04/rounded_icon_1024-180x180.pngw3.webp"
              alt=""
            />
            <h2 className="logo">hoursON</h2>
          </div>

          <div className="right-corner">
            <span className="name"></span>
            <div className="right-corner">
              <span className="name">
                {userFirstName}&nbsp;&nbsp;
                {userLastName}
              </span>
              {user && (
                <ul className="nav-menu-items1">
                  {TopbarData.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className={item.cName}
                        onClick={logoutUser}
                      >
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
          </div>
        </div>
        <nav className="nav-menu active nav-menu">
          {role === "admin" && (
            <ul className="nav-menu-items">
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
          )}
          {role === "user" && (
            <ul className="nav-menu-items">
              {filteredData.map((item, index) => {
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
          )}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
