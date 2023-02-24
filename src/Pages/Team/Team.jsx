import React from "react";
import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import jsPDF from "jspdf";

import "./Team.css";

function Team() {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [allUsers, setAllUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [dateParameter, setDateParameter] = useState({
    from: `${new Date(new Date().getFullYear(), 0, 1)
      .toISOString()
      .substring(0, 19)}Z`,
    to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
  });
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
    fetch(`http://localhost:8081/user`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[data.length - 1].clocksOut === null) {
          setDisabledBtn(true);
        }
        console.log("*   *   *", data);
        setAllUsers(data);
      })
      .catch((err) => {
        console.log("errrror");
      });
  }, [user, contextPassword, disabledBtn, isGenerated]);

  const generateReport = async () => {
    console.log(dateParameter);
    setIsGenerated(true);
    const credentials = btoa(`${user}:${contextPassword}`);
    await fetch(
      `http://localhost:8081/time/period/${currentUser || user}?from=${
        dateParameter.from
      }&to=${dateParameter.to}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    )
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

  const downloadPdf = () => {
    let doc = new jsPDF("p", "pt", "a4");
    let pageWidth = 595;
    let pageHeight = 842;

    let pageMargin = 20;

    pageWidth -= pageMargin * 2;
    pageHeight -= pageMargin * 2;

    let cellPadding = 10;
    let cellWidth = 300;
    let cellHeight = 20;
    let lineHeight = 20;

    let startX = pageMargin;
    let startY = pageMargin;

    doc.setFontSize(12);

    let page = 1;

    function createCard(item) {
      //cell projection
      let requiredWidth = startX + cellWidth + cellPadding * 2;

      let requiredHeight = startY + cellHeight + cellPadding * 2;

      if (requiredWidth <= pageWidth) {
        textWriter(item, startX + cellPadding, startY + cellPadding);

        startX = requiredWidth;
        //  startY += cellHeight + cellPadding;
      } else {
        if (requiredHeight > pageHeight) {
          doc.addPage();
          page++;
          doc.setPage(page);

          startY = pageMargin;
        } else {
          startY = requiredHeight;
        }

        startX = pageMargin;

        textWriter(item, startX + cellPadding, startY + cellPadding);

        startX = startX + cellWidth + cellPadding * 2;
      }
    }

    function textWriter(item, xAxis, yAxis) {
      doc.text(
        `Check in: ${item.clocksIn}         Check out: ${item.clocksOut}`,
        xAxis,
        yAxis + lineHeight
      );
    }

    doc.text(20, 20, `Timesheet for ${currentUser}`);
    for (let i = 0; i < userData.length; i++) {
      createCard(userData[i]);
    }
    doc.save("Test.pdf");
  };

  const dateCustomForamtter = (value) => {
    console.log(value);
    switch (value) {
      case "current-week":
        setDateParameter({
          from: `${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substring(0, 19)}Z`,
          to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
        });
        break;
      case "current-month":
        setDateParameter({
          from: `${new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            .toISOString()
            .substring(0, 19)}Z`,
          to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
        });
        break;
      case "today":
        setDateParameter({
          from: `${new Date().toISOString().substring(0, 10)}T00:00:00Z`,
          to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
        });
        break;
      case "current-year":
        setDateParameter({
          from: `${new Date(new Date().getFullYear(), 0, 1)
            .toISOString()
            .substring(0, 19)}Z`,
          to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
        });
      default:
        setDateParameter({
          from: `${new Date(new Date().getFullYear(), 0, 1)
            .toISOString()
            .substring(0, 19)}Z`,
          to: `${new Date(Date.now()).toISOString().substring(0, 19)}Z`,
        });
    }
  };

  return (
    <div className={`wrapper-div ${isGenerated ? "active-cont" : ""}`}>
      <p>Team</p>
      <hr />

      <div className="buttons-generate">
        <div>
          <select
            name="period"
            id="period"
            onChange={(e) => {
              dateCustomForamtter(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="current-week">Current Week</option>

            <option value="current-month">Current Month</option>
            <option value="current-year">Current Year</option>
          </select>
        </div>

        {allUsers && (
          <div>
            <select
              onChange={(e) => {
                setCurrentUser(e.target.value);
              }}
              name="period"
              id="period"
            >
              {allUsers.map((user) => {
                return (
                  <option key={user.username} value={user.username}>
                    {user.username}
                  </option>
                );
              })}
            </select>
          </div>
        )}

        <button
          disabled={disabledBtn}
          className="login-btn-report"
          onClick={generateReport}
        >
          Generate
        </button>
        <div className="pdf" title="Generate PDF report" onClick={downloadPdf}>
          <img src="https://www.svgrepo.com/show/56192/pdf.svg" alt="" />
        </div>
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

export default Team;
