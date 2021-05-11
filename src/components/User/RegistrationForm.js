import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { v4 as uuid } from "uuid";

const RegistrationForm = () => {
  const history = useHistory();
  const { addToast } = useToasts();

  const [userInput, setUserInput] = useState({
    memberName: "",
    memberEmail: "",
    contact: "",
    country: "",
    state: "",
    address: "",
    pan: "",
    birthdate: "",
    password: "",
    userID: uuid(),
    age: "",
  });

  const {
    memberName,
    memberEmail,
    country,
    state,
    address,
    pan,
    contact,
    birthdate,
    password,
    userID,
    age,
  } = userInput;


  const [nameError, setNameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [contactError, setContactError] = useState({});
  const [countryError, setCountryError] = useState({});
  const [stateError, setStateError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [panError, setPanError] = useState({});
  const [dobError, setDOBError] = useState({});

  useEffect(() => {
    console.log(ageValidation(userInput.birthdate));

  }, []);

  const selectCountry = (input) => {
    setUserInput({ ...userInput, country: input });
  };
  const selectState = (input) => {
    setUserInput({ ...userInput, state: input });
  };

  const ValidateEmail = (mail) => {
    if (
      mail !== "" &&
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  //age validation and calcution
  const ageValidation = (dob) => {
    dob.replace(/-/g, "/");
    let birthdate = new Date(dob);
    let currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
    let age = ~~((Date.now(currentDate) - birthdate) / 31557600000);
    setUserInput({ ...userInput, age: age });
    return age;
  };

  const formValidation = () => {
    const nameError = {};
    const emailError = {};
    const contactError = {};
    const panError = {};
    const countryError = {};
    const stateError = {};
    const dobError = {};
    const addressError = {};

    let isFormValid = true;

    //name validation

    if (userInput.memberName.trim() === "") {
      nameError.nameRequired = "Name is required";
      isFormValid = false;
    }

    if ( !userInput.memberName.match(/^[A-Z]+$/) && !userInput.memberName.trim().length == 0 ) {
      nameError.formatCapital = "Name should be in capital letters";
      isFormValid = false;
    }

    //email Validation

    if (userInput.memberEmail === "") {
      emailError.emptyEmail = "Email is required";
      isFormValid = false;
    }

    if (
      userInput.memberEmail !== "" &&
      ValidateEmail(userInput.memberEmail) === false
    ) {
      emailError.validEmail = "Please enter a valid email address";
      isFormValid = false;
    }

    //pancard validation

    if (!userInput.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      panError.formatError = " Please enter Valid PAN !";
      isFormValid = false;
    }

    //phone number validation

    if (!userInput.contact.match(/^\d{10}$/)) {
      contactError.lengthError = "Phone Number Must be 10 Digit !!";
      isFormValid = false;
    }

    //country validation
    if (userInput.country === "") {
      countryError.countryRequired = "Country is required";
      isFormValid = false;
    }
    // state validation
    if (userInput.state === "") {
      stateError.stateRequired = "State is required";
      isFormValid = false;
    }

    // adddress validation
    if (userInput.address.trim() === "") {
      addressError.addressRequired = "This Field is required";
      isFormValid = false;
    }

    //age Validation
    if (userInput.birthdate.trim()=== '' ) {
      dobError.empty = "This Field is required";
    }

    if(ageValidation(userInput.birthdate) < 18 && !userInput.birthdate.length == 0) {
      dobError.age = " User DOB is must be greater than 18 yr !!";
    }

    setNameError(nameError);
    setEmailError(emailError);
    setPanError(panError);
    setContactError(contactError);
    setStateError(stateError);
    setCountryError(countryError);
    setAddressError(addressError);
    setDOBError(dobError);

    return isFormValid;
  };


  const onSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = formValidation();
    if (isFormValid) {
      setTimeout(function () {
        axios.post("http://localhost:9001/users/add", userInput);
        addToast(`Member added successfully : ${userInput.userID}`, {
          appearance: "success",
        });
        history.push("/");
      }, 1500);
    }
  };

  const onInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };


  return (
    <>
      <nav class="navbar navbar-dark bg-dark">
        <a class="navbar-brand">Claim Portal</a>
      </nav>
      <div className="container bg-light ">
        <h2 className="text-center">Register member</h2>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-6">
              <label>Name:</label>
              <input
                className="form-control"
                id="memberName"
                name="memberName"
                value={memberName}
                type="text"
                onChange={onInputChange}
              />
              {Object.keys(nameError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {nameError[key]}
                  </div>
                );
              })}
            </div>
            <div className="col-6">
              <label>Password : </label>
              <input
                className="form-control"
                id="password"
                name="password"
                value={password}
                type="password"
                onChange={onInputChange}
              />
              {Object.keys(addressError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {addressError[key]}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label>Contact Number:</label>
              <input
                className="form-control"
                id="contact"
                name="contact"
                value={contact}
                type="text"
                onChange={onInputChange}
              />
              {Object.keys(contactError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {contactError[key]}
                  </div>
                );
              })}
            </div>
            <div className="col-6 ">
              <label>PAN Number</label>
              <input
                className="form-control"
                id="pan"
                name="pan"
                value={pan}
                type="text"
                onChange={onInputChange}
              />
              {Object.keys(panError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {panError[key]}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Country:</label>
              <CountryDropdown
                className="form-control"
                value={country}
                onChange={(e) => selectCountry(e)}
              />
              {Object.keys(countryError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {countryError[key]}
                  </div>
                );
              })}
            </div>
            <div className="col-6">
              <label>State:</label>
              <RegionDropdown
                className="form-control"
                country={country}
                value={state}
                onChange={(e) => selectState(e)}
              />
              {Object.keys(stateError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {stateError[key]}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Date of Birth:</label>
              <input
                className="form-control"
                id="birthdate"
                name="birthdate"
                value={birthdate}
                type="date"
                onChange={onInputChange}
              />
              {Object.keys(dobError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {dobError[key]}
                  </div>
                );
              })}
            </div>

            <div className="col-6">
              <label>Address : </label>
              <input
                className="form-control"
                id="address"
                name="address"
                value={address}
                type="text"
                onChange={onInputChange}
              />
              {Object.keys(addressError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {addressError[key]}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="row">
            <div className="col-6 ">
              <label>Email</label>
              <input
                className="form-control"
                id="memberEmail"
                name="memberEmail"
                value={memberEmail}
                type="text"
                onChange={onInputChange}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {emailError[key]}
                  </div>
                );
              })}
            </div>
            <div className="col-3 submit-button">
              <button className="btn btn-primary  btn-submit" type="submit">
                Submit
              </button>
            </div>
            <div className="col-3 submit-button">
              <button
                className="btn btn-secondary  btn-submit"
                onClick={() => {
                  history.push("/");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
