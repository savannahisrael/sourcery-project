import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Landing from './components/Pages/landing';
import Dashboard from './components/Pages/dashboard';
import Explore from './components/Pages/explore';
import Create from './components/Pages/createProject';
import Project from './components/Pages/project';
import Profile from './components/Pages/userProfile';
import CohortLogin from './components/Pages/cohortLogin';
import Footer from './components/Common/footer';
import './App.css';
import axios from 'axios';
// import '../semantic/dist/semantic.min.css';

//function checking github auth
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    axios.get('/auth/checkLoggedIn').then(res=>  console.log(res.data.login)) ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const App = () =>
  <Router>
    <div className='Main'>
      <div className='Main-content'>
        <Route exact path='/' component={Landing} />
        <Route exact path='/cohortCodeLogin' component={CohortLogin} />
        <PrivateRoute path='/:cohort/explore' component={Explore} />
        <PrivateRoute path='/:cohort/create' component={Create} />
        <PrivateRoute path='/:cohort/:username/profile' component={Profile} />
        <PrivateRoute path='/:cohort/:username/dashboard' component={Dashboard} />
        <PrivateRoute path='/:cohort/:username/edit/:project' component={Create} />
        <PrivateRoute path='/:cohort/:username/app/:project' component={Project} />

      </div>
      <Footer />
    </div>
  </Router>;

export default App;
