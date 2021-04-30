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
    isLoggedIn: ""
  };

  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleValidation = () => {
    const emailError = {};
    const passwordError = {};

    let formIsValid = true;

    // email validation 

    if (typeof user.email !== "undefined") {
        let lastAtPos = user.email.lastIndexOf("@");
        let lastDotPos = user.email.lastIndexOf(".");
  
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            user.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            user.email.length - lastDotPos > 2
          )
        ) {
          emailError.validEmail = " Please Enter Valid Email !!";
          formIsValid = false;
          setEmailError(emailError);
        }

        //passoword validation 

        if (user.password.trim() === '') {
            passwordError.requiredError = "Please Enter valid Password!!";
            formIsValid = false;
            setPasswordError(passwordError);
          }
      }
  
  }

  const login = async (e) => {
    e.preventDefault();
    handleValidation();
    const result = await axios.post("http://localhost:3003/login", user);
    setIsLoggedIn(true);
    history.push({
         pathname: "/submit-claim",
         state: { email: user.email}
    });
  };

  return (
    <div>
      <div className="col-sm-6 offset-sm-3">
        <br/>
        {!user.isLoggedIn &&  <div className="alert alert-warning">Invalid Username/password</div>}
        <input
          type="text"
          placeholder="Email"
          className="form-control"
          onChange={(e) => setEnteredEmail(e.target.value)}
        />
        <div>
            {Object.keys(emailError).map((key) => {
               return <span style={{ color: "red" }}>{emailError[key]}</span>
            })}
          </div><br/>
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        <div>
            {Object.keys(passwordError).map((key) => {
               return <span style={{ color: "red" }}>{passwordError[key]}</span>
            })}
          </div><br/>
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
