import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const {
    userData,
    setUser,
    setContextPassword,
    setUserFirstName,
    setUserLastName,
    setUserId,
    setRole,
    user,
  } = useContext(GeneralContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const switchToSignInForm = () => {
    window.location.replace("/register");
  };

  const login = () => {
    console.log(userData);
    const credentials = btoa(`${username}:${password}`);
    fetch(`http://localhost:8081/user/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setContextPassword(password);
        setUserFirstName(data.firstName);
        setUserLastName(data.lastName);
        setUser(data.username);
        setUserId(data.id);
        setRole(data.role);
        notify("success", "You are succesufully logged in");
        localStorage.setItem("user", data.username);
      })
      .catch((err) => {
        notify("warning", "Username or password are incorrect");
      });
  };

  const notify = (toastType, message) => {
    toast[toastType](message, { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <div className="body-login">
      <div className="login-form">
        <h1>Login</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="username"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Passsword"
        />
        <button className="login-btn" onClick={login}>
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
