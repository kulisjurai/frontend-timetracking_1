import React from "react";
import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import "./Reports.css";

function Reports() {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const {
    userData,
    setUserData,
    user,
    contextPassword,
    userFirstName,
    userLastName,
  } = useContext(GeneralContext);

  useEffect(() => {
    const credentials = btoa(`${user}:${contextPassword}`);
    fetch(`http://localhost:8081/time`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data[data.length - 1].clocksOut === null);
        if (data[data.length - 1].clocksOut === null) {
          setDisabledBtn(true);
        }
        setUserData(data);
      })
      .catch((err) => {
        console.log("errrror");
      });
  }, [user, contextPassword, disabledBtn, isGenerated, setUserData]);

  const generateReport = async () => {
    setIsGenerated(true);
    const credentials = btoa(`${user}:${contextPassword}`);
    await fetch(`http://localhost:8081/time`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setUserData([{}]);
        }
        setUserData(data);
      })
      .catch((err) => {
        console.log("errrror");
      });
  };

  const calculateTotalTime = (clockOut, clockIn) => {
    let seconds = Math.ceil(
      Math.abs(new Date(clockOut).getSeconds() - new Date(clockIn).getSeconds())
    );
    let minutes = Math.abs(
      new Date(clockOut).getMinutes() - new Date(clockIn).getMinutes()
    );
    let hours = Math.abs(
      new Date(clockOut).getHours() - new Date(clockIn).getHours()
    );
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return {
      seconds,
      minutes,
      hours,
    };
  };

  return (
    <div className={`wrapper-div ${isGenerated ? "active-cont" : ""}`}>
      <p>
        Timesheet for: {userFirstName}&nbsp;{userLastName}
      </p>
      <hr />
      <div className="buttons-generate">
        <div>
          <select name="period" id="period">
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="last-week">Last Week</option>

            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>

        <button
          disabled={disabledBtn}
          className="login-btn-report"
          onClick={generateReport}
        >
          Generate
        </button>
      </div>
      <hr />
      <br />
      {disabledBtn && (
        <h4>
          Unfortunately you cannot generate report if your worklog session is
          active.
        </h4>
      )}
      {!isGenerated && (
        <div>
          <img
            className="img-report"
            src="https://www.livetecs.com/wp-content/uploads/2019/05/Online-Timesheet.png"
            alt=""
          />
        </div>
      )}
      {isGenerated && userData && (
        <div>
          <div className="headers">
            <div id="c-in">Check in</div>
            <div id="c-out">Check out</div>
            <div id="ttl">Total</div>
          </div>
          <br />
          {userData.map((timeEntry, index) => {
            return (
              <div key={index} className="print-report">
                {" "}
                <div className="check-in">
                  <div className="start">
                    {timeEntry.clocksIn.substring(0, 10)}
                  </div>
                  <div className="center">
                    {timeEntry.clocksIn.substring(11, 19)}
                  </div>
                </div>
                <div className="check-out">
                  <div className="start">
                    {timeEntry.clocksOut.substring(0, 10)}
                  </div>
                  <div className="center">
                    {timeEntry.clocksOut.substring(11, 19)}
                  </div>
                </div>
                <div className="total">
                  <p>
                    {
                      calculateTotalTime(
                        timeEntry.clocksOut,
                        timeEntry.clocksIn
                      ).hours
                    }
                    :
                    {
                      calculateTotalTime(
                        timeEntry.clocksOut,
                        timeEntry.clocksIn
                      ).minutes
                    }
                    :
                    {
                      calculateTotalTime(
                        timeEntry.clocksOut,
                        timeEntry.clocksIn
                      ).seconds
                    }{" "}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Reports;
