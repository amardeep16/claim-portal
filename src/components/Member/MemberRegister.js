import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

export default function MemberRegister() {
  let history = useHistory();

  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [phoneError, setPhoneError] = useState({});
  const [pancardError, setPanCardError] = useState({});
  const [dobError, setDobError] = useState({});

  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    state: "",
    country: "",
    dob: "",
    pannumber: "",
    age: "",
    id: uuid(),
  });

  const {
    name,
    phone,
    email,
    password,
    address,
    state,
    country,
    dob,
    pannumber,
    age,
  } = user;

  const selectCountry = (e) => {
    setUser({...user, country: e});

  };

  const selectState = (e) => {
    setUser({...user, state: e});
  }

  const onInputChange = (e) => {
    //  console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
   
  };

  const ageValidation = (dob) => {
    dob.replace(/-/g, "/");
    let myBirthday = new Date(dob);
    let currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
    let age = ~~((Date.now(currentDate) - myBirthday) / 31557600000);
    setUser({ ...user, age: age });
    return age;
  };

  useEffect(() => {
    ageValidation(user.dob);
    
  }, []);

  const handleValidation = (e) => {
    const nameError = {};
    const emailError = {};
    const phoneError = {};
    const dobError = {};
    const pancardError = {};
    let formIsValid = true;

    //user name validation
    if (user.name.trim() === "") {
      nameError.requiredError = "This Field is Required!!";
      formIsValid = false;
    }

    if (!user.name.match(/^[A-Z]+$/) && !user.name.trim() === "") {
      nameError.formatError = " Name Shoud be only in capital Letter";
      formIsValid = false;
    }

    setNameError(nameError);

    //email validation

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
    }

    // contact number validation
    if (user.phone.trim().length < 10) {
      phoneError.lengthError = "Phone Number Must be 10 Digit !!";
      formIsValid = false;
      setPhoneError(phoneError);
    }

    //pancard validation
    if (!user.pannumber.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      pancardError.formatError = " Please Enter Valid PAN !!";
      formIsValid = false;
      setPanCardError(pancardError);
    }

    //age Validation
    if (ageValidation(user.dob) < 18) {
      dobError.age = " User DOB is must be greater than 18 yr !!";
      setDobError(dobError);
      
    }

    return formIsValid;
  };

  const onSubmit = async (e) => {
    console.log("onsubmit called!!!!");
    e.preventDefault();
    handleValidation(e);

    await axios.post("http://localhost:3003/users", user);
    history.push("/user/login");
  };

  

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(nameError).map((key) => {
              return <span style={{ color: "red" }}>{nameError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            name="email"
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(emailError).map((key) => {
              return <span style={{ color: "red" }}>{emailError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            name="password"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label for="Address" className="form-label">
            Address Line
          </label>
          <input
            type="text"
            className="form-control"
            id="Address"
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div>
          <CountryDropdown value={country} onChange={(e) => selectCountry(e)} />
          <RegionDropdown
            country={country}
            value={state}
            onChange={(e) => selectState(e)}
          />
        </div>
        <br />

        <div className="mb-3">
          <label for="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(dobError).map((key) => {
              return <span style={{ color: "red" }}>{dobError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={phone}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(phoneError).map((key) => {
              return <span style={{ color: "red" }}>{phoneError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Pan Number</label>
          <input
            type="text"
            className="form-control"
            name="pannumber"
            value={pannumber}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(pancardError).map((key) => {
              return <span style={{ color: "red" }}>{pancardError[key]}</span>;
            })}
          </div>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
