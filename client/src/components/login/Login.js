import React from "react";
import "./styles.css";
import { Button } from "reactstrap";

function Login() {
  return (
    <div className="back">
      <div className="login-box">
        <h1>Login</h1>
        <div className="textbox">
          <i className="fa fa-user" aria-hidden="true" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="textbox">
          <i className="fa fa-lock" aria-hidden="true" />
          <input type="password" placeholder="Password" />
        </div>
        <Button className="button">Sign In</Button>
      </div>
    </div>
  );
}

export default Login;
