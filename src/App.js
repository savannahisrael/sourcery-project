import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Pages/landing";
import Dashboard from "./components/Pages/dashboard";
import Explore from "./components/Pages/explore";
import Create from "./components/Pages/createProject";
import Project from "./components/Pages/project";
import Profile from "./components/Pages/userProfile";
import Navbar from "./components/Common/navBar";
import Container from "./components/Common/container";
import Footer from "./components/Common/footer";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Container>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/project" component={Project} />
        <Route exact path="/profile" component={Profile} />
      </Container>
      <Footer />
    </div>
  </Router>;

export default App;
