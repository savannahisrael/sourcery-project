import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/pages/landing";
import Dashboard from "./components/pages/dashboard";
import Explore from "./components/pages/explore";
import Create from "./components/pages/createProject";
import Project from "./components/pages/project";
import Profile from "./components/pages/userProfile";


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
