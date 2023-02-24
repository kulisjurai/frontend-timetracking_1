import React, { useContext, useEffect } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import "./Support.css";

function Support() {
  const { state } = useContext(GeneralContext);
  useEffect(() => {}, [state]);
  return (
    <div>
      <div className="wrapper-div">
        <h2>Wellcome to our Support page</h2>
        <h4>
          Here you will find answers to commonly asked questions and information
          about our products and services. If you are experiencing any issues or
          have any questions about our products, we are here to help. Our team
          of experienced support specialists is available 24/7 to assist you
          with any concerns you may have. Whether you need help with
          installation, troubleshooting, or just have a general question, we are
          here to provide you with the support you need. In this section, you
          will also find helpful resources such as user guides, video tutorials,
          and FAQs to help you get the most out of our products. If you can't
          find the answer to your question here, don't hesitate to contact us
          directly. Thank you for choosing our product, and we look forward to
          assisting you in any way we can.
        </h4>
        <p>
          Our timesheet application is designed to help businesses and
          organizations of all sizes effectively track and manage their
          employees' time and attendance. With our user-friendly interface and
          comprehensive features, businesses can easily monitor their employees'
          time spent on various projects, track overtime, and generate detailed
          reports for payroll processing. Our timesheet application allows
          employees to clock in and out electronically, either through their
          desktop or mobile device, eliminating the need for manual time
          tracking.
        </p>
        <p>
          The application also supports multiple job codes, which allows for
          greater flexibility in tracking time spent on specific projects or
          tasks. Administrators can easily manage employee time off requests,
          approve or deny time off, and set up customized leave policies. The
          application also integrates with popular payroll systems, making it
          simple to export employee hours and ensure accurate payroll
          processing. In addition to tracking time and attendance, our timesheet
          application provides real-time insights into employee productivity and
          project status. With customizable reports and dashboards, businesses
          can gain visibility into how their employees are spending their time
          and identify areas for improvement.
        </p>
        <p>
          Overall, our timesheet application streamlines the time tracking
          process, reduces errors, and helps businesses make informed decisions
          based on accurate data.
        </p>
        <b> Thank you for using our application! Best regards!</b>
        <hr />
        <h2>FAQ</h2>
        <br />
        <br />
        <b>
          {" "}
          Q: Can I track time for multiple projects using your timesheet
          application?
        </b>
        <p>
          {" "}
          A: Yes, our timesheet application supports multiple job codes,
          allowing you to track time for different projects or tasks.
        </p>
        <br />
        <b>
          {" "}
          Q: Can I set up different leave policies for different employees?
        </b>
        <p>
          A: Yes, our timesheet application allows you to customize leave
          policies based on employee roles or departments.
        </p>
        <br />{" "}
        <b> Q: Can I use the timesheet application on my mobile device? </b>
        <p>
          {" "}
          A: Yes, our timesheet application is available on both desktop and
          mobile devices, making it easy for employees to clock in and out
          remotely
        </p>
        <br />
        <b>
          {" "}
          Can I integrate the timesheet application with my payroll system?{" "}
        </b>
        <p>
          A: Yes, our timesheet application integrates with popular payroll
          systems, making it simple to export employee hours and ensure accurate
          payroll processing.
        </p>
        <br />
        <b>
          Q: Can I generate customized reports and dashboards with the timesheet
          application?{" "}
        </b>
        <p>
          A: Yes, our timesheet application allows you to generate customizable
          reports and dashboards to gain insights into employee productivity and
          project status
        </p>
      </div>
    </div>
  );
}

export default Support;
