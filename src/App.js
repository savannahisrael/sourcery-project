import React from "react";
import io from 'socket.io-client';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Landing from "./components/Pages/landing";
import Dashboard from "./components/Pages/dashboard";
import Explore from "./components/Pages/explore";
import Create from "./components/Pages/createProject";
import Project from "./components/Pages/project";
import Profile from "./components/Pages/userProfile";
import pageContainer from "./components/Common/pageContainer";
import Footer from "./components/Common/footer";
import './App.css';
import axios from 'axios';
// import '../semantic/dist/semantic.min.css';

const socket = io();
socket.on('connect', () => console.log('Socket connected.'));

//function checking github auth
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    true ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

axios.get('../auth/checkLoggedIn').then(res=>  console.log(res.data))

const App = () =>
  <Router>
    <div className="Main">
      <pageContainer className="Main-content">
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/explore" component={Explore} />
        <PrivateRoute exact path="/create" component={Create} />
        <PrivateRoute path="/:cohort/:username/profile" component={Profile} />
        <PrivateRoute path="/:cohort/:username/dashboard" component={Dashboard} />
        <PrivateRoute path="/:cohort/:username/app/:project" component={Project} />
      </pageContainer>
      <Footer />
    </div>
  </Router>;

export default App;
