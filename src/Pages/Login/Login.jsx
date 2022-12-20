import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const { setUser } = useContext(GeneralContext);

  useEffect(() => {
    console.log("computed once");
  }, []);

  const switchToSignInForm = () => {
    window.location.replace("/register");
  };

  const saveUser = () => {
    setUser("Stanko");
    notify();
  };

  const notify = () => {
    toast.success("Login successuful", { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <div className="body-login">
      <div className="login-form">
        <h1>Login</h1>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Passsword" />
        <button className="login-btn" onClick={saveUser}>
          Login
        </button>
        <p>
          Don't Have an Account!
          <span className="sign-in" onClick={switchToSignInForm}>
            Sign in
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
