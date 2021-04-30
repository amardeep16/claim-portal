import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function SubmitClaim(props) {
  const location = useLocation();

  const[email, setEmail] = useState("");

  useEffect(() => {
    setEmail(location.state.email);
    console.log(location.state.email);
  }, [location]);


  return (
    <div>
      <h4>Welcome <br/>{email}</h4>
      <Link className="btn btn-outline-primary mr-2 " to={`/add-claim`}>
        Submit Claim
      </Link>
    </div>
  );
}
