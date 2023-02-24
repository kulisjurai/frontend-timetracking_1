import React, { useState, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnalogClock from "analog-clock-react";
import "./Home.css";

function Home() {
  const {
    userId,
    user,
    contextPassword,
    completedTimeSession,
    setCompletedTimeSession,
  } = useContext(GeneralContext);
  const [value, onChange] = useState(new Date());

  let options = {
    width: "200px",
    border: true,
    borderColor: "#19A3FF",
    baseColor: "#99D6FF",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff",
    },
  };

  const notify = (toastType, message) => {
    toast[toastType](message, { position: toast.POSITION.TOP_RIGHT });
  };

  const checkTime = async (type) => {
    setCompletedTimeSession(!completedTimeSession);
    const credentials = btoa(`${user}:${contextPassword}`);
    await fetch(`http://localhost:8081/time/${type}/${userId}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        type === "in"
          ? notify(
              "success",
              `You are successufully checked in at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            )
          : notify(
              "info",
              `You are successufully checked out at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
            );
        console.log("***********", data);
      })
      .catch((err) => {
        console.log("errrror");
      });
  };
  return (
    <div>
      <div className="wrapper-div">
        Time check
        <hr />
        <div className="upper-div">
          <div className="inner time-checking">
            {!completedTimeSession && <h2>You are currently active</h2>}
            {completedTimeSession && <h2>You are currently inactive</h2>}
            <div className="check-btn-wrapper">
              {" "}
              {completedTimeSession && (
                <img
                  className="img-check"
                  title="Check"
                  src="https://www.svgrepo.com/show/84345/file.svg"
                  alt=""
                />
              )}
              {!completedTimeSession && (
                <img
                  className="check-out-image"
                  src="https://www.svgrepo.com/show/20604/file.svg"
                  alt=""
                />
              )}
              <div className="header-check">
                <h6>Check your time on button bellow</h6>
                <hr />
              </div>
              {completedTimeSession && (
                <div
                  className="green"
                  onClick={() => {
                    checkTime("in");
                  }}
                >
                  <h3>Activate time</h3>
                </div>
              )}
              {!completedTimeSession && (
                <div
                  className="red"
                  onClick={() => {
                    checkTime("out");
                  }}
                >
                  <h3>Deactivate time</h3>
                </div>
              )}
              {/* <ProgressBar progress={20} radius={100} /> */}
            </div>
          </div>
          <div className="inner">
            <Calendar className="calendar" onChange={onChange} value={value} />
            <div className="analog-wrapper">
              <AnalogClock className="analog-clock" {...options} />
            </div>
          </div>
        </div>
        <hr />
        <div className="lower-div"></div>
      </div>
    </div>
  );
}

export default Home;
