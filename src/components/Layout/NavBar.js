import React from "react";

const Navbar = ({  logout }) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Claim Portal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-g-0 ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/home">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" href="/claim/list">
                  Claim List
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" href="/claim/add">
                  Add Claim
                </a>
              </li>

              <li class="nav-item">
                <a className="nav-link active" href="/profile">
                  My Profile
                </a>
              </li>
              <li class="nav-item">
                <a className="nav-link active" href="/" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
