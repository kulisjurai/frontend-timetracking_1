import "./Login.css";

function Login() {
  return (
    <div className="login-form">
      <h1>Login</h1>
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Passsword" />
      <button className="login-btn">Login</button>
      <p>Don't Have an Account! Sign in</p>
    </div>
  );
}

export default Login;
