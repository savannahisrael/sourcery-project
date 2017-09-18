import React from "react";
import io from 'socket.io-client';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Pages/landing";
import Dashboard from "./components/Pages/dashboard";
import Explore from "./components/Pages/explore";
import Create from "./components/Pages/createProject";
import Project from "./components/Pages/project";
import Profile from "./components/Pages/userProfile";
import pageContainer from "./components/Common/pageContainer";
import Footer from "./components/Common/footer";
import './App.css';
// import '../semantic/dist/semantic.min.css';


const socket = io();

socket.on('connect', () => console.log('Socket connected.'));

const App = () =>
  <Router>
    <div className="Main">
      <pageContainer className="Main-content">
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/profile" component={Profile} />
      </pageContainer>
      <Footer />
    </div>
  </Router>;

export default App;
