import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MemberRegistrationForm from "../User/RegistrationForm";
import LoginForm from "../User/LoginForm";
import Navbar from "../Layout/Navbar";
import { CookiesHelper } from "../helper/CookiesHelper";
import Home from "../User/Home";
import ClaimList from "../Claim/ClaimList";
import AddClaim from "../Claim/AddClaim";
import Myprofile from "../User/MyProfile";

const cookieService = CookiesHelper();

function Landing() {

  const storeactiveUserDetail = cookieService.readCookie("activeUserDetail");

  const [state, setState] = useState({
    activeUserDetail: storeactiveUserDetail,
  });

  const [user, setUser] = useState({});

  const successLogin = (user) => {
    setUser(user);
    setState({ ...state, activeUserDetail: user });

    cookieService.createCookie("activeUserDetail", user, 1);
  };

  const logOutClickHandler = () => {

    setState({ ...state, activeUserDetail: null });
    cookieService.eraseCookie("activeUserDetail");

  };
  return (
    <React.Fragment>
      {state.activeUserDetail && (
        <Navbar
          userDetail={state.activeUserDetail}
          logout={logOutClickHandler}
        />
      )}

      <Router>
        <Switch>
          <Route path="/home" component={Home} userDetail={state.activeUserDetail, user} />
          <Route path="/claim/list" component={ClaimList} />
          <Route path="/claim/add" component={AddClaim} />
          <Route path="/member/add" component={MemberRegistrationForm} />
          <Route path="/profile" component={Myprofile}></Route>
          <Route
            path="/"
            component={() => <LoginForm successLogin={successLogin} />}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default Landing;
