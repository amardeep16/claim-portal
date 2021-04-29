import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";

export default function SubmitClaim() {
    return (
        <div>
            <h1>Welcome</h1>
            <Link className="btn btn-outline-primary mr-2 "  to={`/add-claim`}>Submit Claim</Link>
        </div>
    )
}
