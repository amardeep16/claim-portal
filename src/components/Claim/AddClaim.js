import { useState, useEffect } from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { CookiesHelper } from "../helper/CookiesHelper";
import { ToastProvider, useToasts } from "react-toast-notifications";

const cookieService = CookiesHelper();

const AddClaim = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");

  const [dateOfAdmissionError, setDateOfAdmissionError] = useState({});
  const [billError, setBillError] = useState({});

  const [activeUserDetail, setActiveUserDetail] = useState(
    storeactiveUserDetail
  );
  const [userInput, setUserInput] = useState({

    dateOfDischarge: "",
    dateOfAdmission: "",
    provider: "",
    totalBill: "",
    claimId: "",
  });

  const {
    dateOfAdmission,
    dateOfDischarge,
    provider,
    totalBill,
    claimId,
  } = userInput;

  const handleValidation = () => {
    const dateOfAdmissionError = {};
    let formIsValid = true;

    //admission and discharge validation  Validation
    let dateOfAdmission = new Date(userInput.dateOfAdmission);
    let dateOfDischarge = new Date(userInput.dateOfDischarge);
    if (dateOfDischarge < dateOfAdmission) {
      dateOfAdmissionError.dateErrror = "Please Enter Valid  Date";
      setDateOfAdmissionError(dateOfAdmissionError);
      formIsValid = false;
    }

    //bill valiation
  };

  const generateClaimNumber = () => {
    let cId = Math.floor(1000000000 + Math.random() * 9000000000);
    setUserInput({ ...userInput, claimId: cId });
    console.log(cId);
  };

  useEffect(() => {
    generateClaimNumber();
  }, []);

  const onInputChange = (e) => {
    handleValidation();
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const submitClaim = () => {
    const claimDetail = {
      ...userInput,
      memberName: activeUserDetail.memberName,
      birthdate: activeUserDetail.birthdate,
      userID: activeUserDetail.userID
    };

    axios.post(`http://localhost:9000/claims/addClaim`, claimDetail);
    setTimeout(function () {
      addToast(`Claim added Successfully : ${userInput.claimId}`, {
        appearance: "success",
      });
      history.push("/claim/list");
    }, 1000);
  };

  return (
    <div className="container bg-light mt-5">
      <h2 className="text-center">Add Claim</h2>
      <div className="row">
        <div className="col-6">
          <label>Name:</label>
          <input
            className="form-control"
            value={activeUserDetail.memberName}
            type="text"
            disabled
          />
        </div>
        <div className="col-6">
          <label>Date of Birth:</label>
          <input
            className="form-control"
            value={activeUserDetail.birthdate}
            type="text"
            disabled
          />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Date Admission:</label>
          <input
            className="form-control"
            value={dateOfAdmission}
            name="dateOfAdmission"
            type="date"
            onChange={onInputChange}
          />
          <div>
            {Object.keys(dateOfAdmissionError).map((key) => {
              return (
                <span style={{ color: "red" }}>
                  {dateOfAdmissionError[key]}
                </span>
              );
            })}
          </div>
        </div>
        <div className="col-6">
          <label>Date Discharge:</label>
          <input
            className="form-control"
            value={dateOfDischarge}
            name="dateOfDischarge"
            type="date"
            onChange={onInputChange}
          />
          <div>
            {Object.keys(dateOfAdmissionError).map((key) => {
              return (
                <span style={{ color: "red" }}>
                  {dateOfAdmissionError[key]}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label>Provider:</label>
          <input
            className="form-control"
            value={provider}
            name="provider"
            type="text"
            onChange={onInputChange}
          />
        </div>
        <div className="col-6">
          <label>Total bill:</label>
          <input
            className="form-control"
            value={totalBill}
            name="totalBill"
            type="number"
            onChange={onInputChange}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4">
          <button className="btn btn-primary  btn-submit" onClick={submitClaim}>
            Submit Claim
          </button>
          <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AddClaim;
