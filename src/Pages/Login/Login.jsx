import { useState, useEffect, useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import "./Login.css";

function Login() {
  const { setState } = useContext(GeneralContext);
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");

  useEffect(() => {
    console.log("computed once");
    fetch(url)
      .then((response) => response.json())
      .then((data) => setState(data));
  }, [url]);

  return (
    <div className="login-form">
      <h1>Login</h1>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Passsword" />
      <button
        onClick={() => {
          console.log(url);
          setUrl("https://jsonplaceholder.typicode.com/todos/1");
          return url;
          console.log(url);
        }}
        className="login-btn"
      >
        Login
      </button>
      <p>Don't Have an Account! Sign in</p>
    </div>
  );
}

export default Login;
