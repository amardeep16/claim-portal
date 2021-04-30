import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export default function ViewDetails() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    pancard: "",
    state: "",
    dob: "",
    age: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(result.data);
  };
  return (
    <div className="container"><br/>
      <Link className="btn btn-secondary btn-lg float-right" to="/">
        Back To Home
      </Link>
      <br />
      <br/>
      <ul className="list-group w-50">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Address: {user.address}</li>
        <li className="list-group-item">
          Region: {user.state}, {user.country}
        </li>
        <li className="list-group-item">Phone: {user.phone}</li>
        <li className="list-group-item">Pan Number: {user.pannumber}</li>
        <li className="list-group-item">Date Of Birth: {user.dob}</li>
        <li className="list-group-item">Age: {user.age}</li>
      </ul>
    </div>
  );
}
