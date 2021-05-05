import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CookiesHelper } from "../helper/CookiesHelper";
import moment from "moment";

const cookieService = CookiesHelper();
const ClaimList = () => {
  const [claimList, setClaimList] = useState([]);
  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");

  useEffect(() => {
    loadClaimList();
  }, []);

  const loadClaimList = async () => {
    var url = `http://localhost:4000/claimList/?birthdate=${storeactiveUserDetail.birthdate}&memberName=${storeactiveUserDetail.memberName}`;
    var response = await axios.get(url);

    console.log("responseList: ", response.data);
    setClaimList(response.data);
  };
  const formatDate = (inputDate) => {
    const date = moment(inputDate).format("MMM. D, YYYY h:mm A z");
    return date;
  };
  return (
    <div className="container bg-light mt-1">
      <div className="py-4">
        <h1 className="text-center">List of Claims</h1>
        <table className="table">
          <thead className="thread-dark">
            <tr>
              <th scope="col"> No.</th>
              <th scope="col">Claim No.</th>
              <th scope="col">Date Of Admission</th>
              <th scope="col">Date Of Discharge</th>
              <th scope="col">Provider</th>
              <th scope="col">TotalBill</th>
            </tr>
          </thead>
          <tbody>
            {claimList.map((claim, index) => (
              <tr key={claim.claimId}>
                <th scope="row">{index+1}</th>
                <th scope="row">{claim.claimId}</th>
                <td>{formatDate(claim.dateOfAdmission)}</td>
                <td>{formatDate(claim.dateOfDischarge)}</td>
                <td>{claim.provider}</td>
                <td>{claim.totalBill}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimList;
