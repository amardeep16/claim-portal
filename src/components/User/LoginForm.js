import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { useHistory } from "react-router";

export default function LoginForm({ successLogin }) {
  const history = useHistory();
  const [state, setState] = useState({
    memberEmail: "",
    password: "",
  });

  const [userNameError, setUserNameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleValidation = () => {
    const userNameError = {};
    const passwordError = {};

    // user name validation

    if (state.memberEmail.trim() === "") {
      {
        userNameError.validName = " Please Enter Valid Email!!";

        setUserNameError(userNameError);
      }

      //passoword validation

      if (state.password.trim() === "") {
        passwordError.requiredError = "Please Enter valid Password!!";

        setPasswordError(passwordError);
      }
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    handleValidation();
    const memberEmail = state.memberEmail;
    const password = state.password;

    var url = `http://localhost:9001/users/login`;
    let response = await axios.post(url, {
      memberEmail: memberEmail,
      password: password
    });
    debugger
    console.log(response);

    if (Object.keys(response.data).length) {
      successLogin(response.data);
      history.push({
        pathname: "/home",
        state:{details: response.data}
      });
    }
  };

  const registerHandler = () => {
    history.push("/member/add");
  };
  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand">Claim Portal</a>
      </nav>

      <div className="col-sm-6 offset-sm-3">
        <h2 className="text-center">Login</h2>
        <label className="form-label">Email</label>
        <input
          type="text"
          className="form-control"
          id="memberEmail"
          placeholder="Email"
          value={state.memberEmail}
          onChange={(e) => {
            setState({ ...state, memberEmail: e.target.value });
          }}
        />
          <div>
          {Object.keys(userNameError).map((key) => {
            return <span style={{ color: "red" }}>{userNameError[key]}</span>;
          })}
        </div>

        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="password"
          name="password"
          value={state.password}
          onChange={(e) => {
            setState({ ...state, password: e.target.value });
          }}
        />
        <div>
          {Object.keys(passwordError).map((key) => {
            return <span style={{ color: "red" }}>{passwordError[key]}</span>;
          })}
        </div>
        <br/>

        <div className="row">
          <div className="col-2">
            <button onClick={loginHandler} className="btn btn-primary">
              Login
            </button>
          </div>

          <div className="col-3">
            <button
              className="btn btn-secondary button-raise"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
