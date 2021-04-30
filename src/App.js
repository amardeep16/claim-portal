import './App.css';
import React  from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './components/Home/Home';
import NavBar from './components/Layout/NavBar';
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import MemberRegister from './components/Member/MemberRegister';
import SubmitClaim from './components/Member/SubmitClaim';
import NotFound from './components/Exceptions/NotFound';
import UpdateMember from './components/Member/UpdateMember';
import ViewDetails from './components/Member/ViewDetails';
import LoginForm from './components/Member/LoginForm';
import ClaimForm from './components/Member/ClaimForm';
import Footer from './components/Layout/Footer';

function App() {

  return (
    <>
      <NavBar/>
      <BrowserRouter>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/add" component={MemberRegister} />
          <Route exact path="/user/edit/:id" component={UpdateMember} />
          <Route exact path="/user/login" component={LoginForm} isLogin={true} />
          <Route exact path="/submit-claim" component={SubmitClaim} />
          <Route exact path="/user/show/:id" component={ViewDetails} />
          <Route exact path="/add-claim" component={ClaimForm} />

          <Route component = {NotFound}></Route>
          <Redirect to="/"/>
        </Switch>
        <Footer/>
      </BrowserRouter>
      
    
    </>
  );
}

export default App;
