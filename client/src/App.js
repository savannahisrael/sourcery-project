import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Landing from './components/Pages/landing';
import Dashboard from './components/Pages/dashboard';
import Explore from './components/Pages/explore';
import Create from './components/Pages/createProject';
import Project from './components/Pages/project';
import Profile from './components/Pages/userProfile';
import CohortLogin from './components/Pages/cohortLogin';
import Footer from './components/Common/footer';
import CreateResource from './components/Pages/createResource';
import Discover from './components/Pages/discover';
import Resource from './components/Pages/resource'
import './App.css';
import axios from 'axios';

//function checking github auth
const PrivateRoute = ({auth, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      auth.login ? (
        <Component auth={auth} {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props)
    // console.log('App constructor.')
    this.state = {
      userID: {
        login: false
      }
    }
  }

  componentDidMount() {
    this.checkLoggedIn();
  }

  checkLoggedIn = () => {
    return axios.get('/auth/checkLoggedIn').then(res => {
      this.setState({ userID: res.data });
      //console.log("res.data in checkLoggedIn: ",res.data);
      return res.data;
    }).catch(error => {
      console.log('Catching Error while authing user:', error);
    });
  }

  render(){
    return (
        <div className='Main'>
          <div className='Main-content'>
            <Switch>
              <Route exact path='/' 
                  render={props => <Landing {...props} auth={this.state.userID}/>} />
              <Route exact path='/cohortCodeLogin' component={CohortLogin} />
              <PrivateRoute path='/:cohort/explore' auth={this.state.userID} component={Explore} />
              <PrivateRoute path='/:cohort/create' auth={this.state.userID} component={Create} />
              <PrivateRoute path='/:cohort/:username/profile' auth={this.state.userID} component={Profile} />
              <PrivateRoute path='/:cohort/:username/dashboard' auth={this.state.userID} component={Dashboard} />
              <PrivateRoute path='/:cohort/:username/edit/:project' auth={this.state.userID} component={Create} />
              <PrivateRoute path='/:cohort/:username/app/:project' auth={this.state.userID} component={Project} />
              <PrivateRoute path='/:cohort/:username/app/:resource' auth={this.state.userID} component={Resource} />
              <PrivateRoute path='/:cohort/add' auth={this.state.userID} component={CreateResource} />
              <PrivateRoute path='/:cohort/discover' auth={this.state.userID} component={Discover} />
            </Switch>
          </div>
          <Footer />
        </div>
    )
  }

}

export default App;
