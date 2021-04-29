import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import CountryRegion from "./CountryRegion";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UpdateMember() {
  let history = useHistory();
  const { id } = useParams();

  const [startDate, setStartDate] = useState(new Date());

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
  } = user;

  const onInputChange = (e) => {
    //  console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    console.log("onsubmit called!!!!");
    e.preventDefault();
    await axios.put(`http://localhost:3003/users/${id}`, user);
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:3003/users/${id}`);
    console.log(result);
    setUser(result.data);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Edit Member</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
          />
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
        <CountryRegion
          id="country"
          name="country"
          value={country}
          onChange={(e) => onInputChange(e)}
        />
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
        </div>{" "}
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
