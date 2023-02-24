import { toast } from "react-toastify";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {}, []);

  const notify = (toastType, message) => {
    toast[toastType](message, { position: toast.POSITION.TOP_RIGHT });
  };

  const switchToLoginInForm = () => {
    window.location.replace("/login");
  };

  const registerUser = () => {
    fetch("http://localhost:8081/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        fisrtName,
        lastName,
        email,
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        window.location.replace("/login");
      })
      .catch((err) => {
        notify(
          "warning",
          "Username or email already exist, please try with another one"
        );
        return;
      });
  };

  return (
    <div className="body-register">
      {" "}
      <div className="register-form">
        <h1>Register</h1>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <button onClick={registerUser} className="register-btn btn">
          Sign Up
        </button>
        <p>
          Already have an Account!
          <span className="sign-in" onClick={switchToLoginInForm}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
