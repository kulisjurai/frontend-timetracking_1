import { ToastContainer, toast } from "react-toastify";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function Register() {
  useEffect(() => {}, []);

  const notify = () => {
    toast.success("Wow its so easy", { position: toast.POSITION.TOP_RIGHT });
  };

  const switchToLoginInForm = () => {
    console.log("Geeeeeee");
    notify();
    window.location.replace("/login");
  };

  return (
    <div className="body-register">
      {" "}
      <div className="register-form">
        <h1>Register</h1>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="text" placeholder="Address" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <button onClick={switchToLoginInForm} className="register-btn btn">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Register;
