import React, {Component} from 'react';
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

// const authObj = {
//   isAuthenticated: false,
//   authenticate(cb){
//     axios.get('/auth/checkLoggedIn').then(res =>{
//       console.log(res.data);
//       authObj.isAuthenticated = res.data.login;
//       console.log("after axios isAuthenticated:", authObj.isAuthenticated);
//       cb();
//       if (authObj.isAuthenticated === true){
//         console.log("authObj if equals true");
//       } else if (authObj.isAuthenticated === false){
//         console.log("authObj if equal false"); 
//       }
//     })
//   }
// }

//function checking github auth
// const PrivateRoute = ({ component: Component, ...rest }) => {
//   console.log("inside private route");
//   return (
//   <Route {...rest} render={props => (
//     (authObj.isAuthenticated === true) ? (
//       <Component {...props}/>
//     ) : (
//       console.log("inside ternary: ",authObj.isAuthenticated)
//     )
//   )}/>
// )}

class PrivateRoute extends Component{
  state = {
    loading: true,
    isAuthenticated: false
  }

  componentDidMount(){
    axios.get('/auth/checkLoggedIn').then(res =>{
      this.setState({
        loading: false, 
        isAuthenticated: res.data.login
      })
    })
  }

  render(){
    console.log("private route: ", this.state);
    const{component:Component, rest} = this.props;
    if(this.state.loading){
      return <div> Loading</div>
    } else {
      return(
        <Route {...rest} render={props => (
          <div>
            {!this.state.isAuthenticated && <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />}
            <Component {...this.props} />
          </div>
        )}
        />
      )
    }
  }
}

const App = () =>{
  console.log("In app before routes");
  // authObj.authenticate();

  return (
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
    </Router>
  )
}

export default App;
