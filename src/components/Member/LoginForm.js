import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const LoginForm = (props) => {
  let history = useHistory();
  const { email } = useParams();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const user = {
    email: enteredEmail,
    password: enteredPassword,
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:3003/login", user);
    debugger
    console.log(user.email);
    setIsLoggedIn(true);
    history.push("/SubmitClaim");
  };

  return (
    <div>
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="Email"
          className="form-control"
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <br />
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
