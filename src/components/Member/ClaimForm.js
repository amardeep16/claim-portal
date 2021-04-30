import React, { useState, useEffect} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ClaimForm() {
  const history = useHistory();

  const [claimDetails, setClaimDetails] = useState({
    name: "",
    dob: "",
    dateOfAdmission: "",
    dateOfDischarge: "",
    provider: "",
    totalBill: "",
    claimId: "",
  });

  const {
    name,
    dob,
    dateOfDischarge,
    dateOfAdmission,
    provider,
    totalBill,
    claimId,
  } = claimDetails;

  const [nameError, setNameError] = useState({});;
  const [dateOfAdmissionError, setDateOfAdmissionError] = useState({});
  const [billError, setBillError] = useState({});

  const handleValidation = (e) => {
    const nameError = {};
    const dateOfAdmissionError = {};
    const billError = {};

    let formIsValid = true;

    //user name validation
    if (claimDetails.name.trim() === "") {
      nameError.requiredError = "This Field is Required!!";
      formIsValid = false;
    }

    if (
      !claimDetails.name.match(/^[A-Z]+$/) &&
      !claimDetails.name.trim() === ""
    ) {
      nameError.formatError = " Name Shoud be only in capital Letter";
      formIsValid = false;
    }

    setNameError(nameError);

    //admission and discharge validation  Validation
    let dateOfAdmission = new Date(claimDetails.dateOfAdmission);
    let dateOfDischarge = new Date(claimDetails.dateOfDischarge);
    if (dateOfDischarge < dateOfAdmission) {
        dateOfAdmissionError.dateErrror = "Please Enter Valid  Date";
      setDateOfAdmissionError(dateOfAdmissionError);
      formIsValid = false;
    }
  };

  const onInputChange = (e) => {
    //  console.log(e.target.value);
    setClaimDetails({ ...claimDetails, [e.target.name]: e.target.value });
  };

  const generateClaimNumber = () => {
     let cId = Math.floor(1000000000 + Math.random() * 9000000000);
     setClaimDetails({...claimDetails, claimId: cId});
     console.log(cId);
  }

  useEffect(() => {
    generateClaimNumber();
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    //generateClaimNumber();
    handleValidation(e);

    await axios.post("http://localhost:3003/claimDetails", claimDetails);
    history.push("/");
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
          <label className="form-label">Provider Name</label>
          <input
            type="text"
            className="form-control"
            id="provider"
            name="provider"
            value={provider}
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
          <label className="form-label">
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
        </div>

        <div className="mb-3">
          <label  className="form-label">
            Date of Admission
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfAdmission"
            name="dateOfAdmission"
            value={dateOfAdmission}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(dateOfAdmissionError).map((key) => {
              return <span style={{ color: "red" }}>{dateOfAdmissionError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label for="dob" className="form-label">
            Date of Discharge
          </label>
          <input
            type="date"
            className="form-control"
            id="dateOfDischarge"
            name="dateOfDischarge"
            value={dateOfDischarge}
            onChange={(e) => onInputChange(e)}
          />
          <br />
          <div>
            {Object.keys(dateOfAdmissionError).map((key) => {
              return <span style={{ color: "red" }}>{dateOfAdmissionError[key]}</span>;
            })}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Total Bill</label>
          <input
            type="number"
            className="form-control"
            name="totalBill"
            value={totalBill}
            onChange={(e) => onInputChange(e)}
          />
          <br />
        </div>

        <button className="btn btn-primary">Raise Claim</button>
      </form>
    </div>
  );
}
