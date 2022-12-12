import "./Register.css";

function Register() {
  return (
    <div className="register-form">
      <h1>Register</h1>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="text" placeholder="Address" />
      <input type="email" placeholder="Email" />
      <input type="text" placeholder="Password" />
      <button className="register-btn">Sign Up</button>
    </div>
  );
}

export default Register;
