import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
    console.log("effect test");
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUser(result.data);
    console.log(result);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home</h1>
        <table className="table">
          <thead className="thread-dark">
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Pan Number</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={`/user/show/${user.id}`}> View</Link>
                  <Link className="btn btn-outline-primary mr-2 " to={`/user/edit/${user.id}`}>Update</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
