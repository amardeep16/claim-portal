import React, { useState } from 'react'
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
        claimId: ""
      });

      const { name, dob, dateOfDischarge, dateOfAdmission, provider, totalBill, claimId } = claimDetails;

    const onInputChange = (e) => {
        //  console.log(e.target.value);
        setClaimDetails({ ...claimDetails, [e.target.name]: e.target.value });
      };
    

    const onSubmit = async (e) => {
        console.log("onsubmit called!!!!");
        e.preventDefault();
        //handleValidation(e);
    
        await axios.post("http://localhost:3003/claimDetails", claimDetails);
        history.push("/submit-claim");
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
              /><br/>
           
            </div>
    
            <div className="mb-3">
              <label  className="form-label">
                Provider Name
              </label>
              <input
                type="text"
                className="form-control"
                id="provider"
                name="provider"
                value={provider}
                onChange={(e) => onInputChange(e)}
              />
            </div>
    
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
              /><br/>
                <div>
            
              </div>
            </div>

            <div className="mb-3">
              <label for="dob" className="form-label">
                Date of Admission
              </label>
              <input
                type="date"
                className="form-control"
                id="dateOfAdmission"
                name="dateOfAdmission"
                value={dateOfAdmission}
                onChange={(e) => onInputChange(e)}
              /><br/>
              
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
              /><br/>
             
            </div>
    
            <div className="mb-3">
              <label className="form-label">Total Bill</label>
              <input
                type="number"
                className="form-control"
                name="totalBill"
                value={totalBill}
                onChange={(e) => onInputChange(e)}
              /><br/>
            
            </div>
    
            <button className="btn btn-primary">Raise Claim</button>
          </form>
        </div>
      );
}
