import React, { Component } from 'react';
import { Form, Label, Icon, Container, Segment, Header, Image } from 'semantic-ui-react';
import './cohortLogin.css';
import axios from 'axios';

class CohortLogin extends Component {
  state = {
    userID: {},
    cohort: ''
  };

  componentDidMount() {
    axios.get('/auth/checkLoggedIn').then((res) => {
      this.setState({ userID: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ', error);
    });
  }

  handleCohortCodeChange = (event) => {
    this.setState({
      cohort: event.target.value
    });
  }

  handleCohortCodeButton = () => {
    console.log("button clicked");
    axios.get('/auth/cohortVerify', {
      params: {
        cohortCode: this.state.cohort
      }
    }).then(res => {
      if (res.data.cohortExists) {
        window.location = `/auth/github`;
      } else {
        console.log("Cohort code incorrect");
        const accessDenied = document.querySelector('.accessDenied');
        accessDenied.style.display = 'block';
      }
    });
  }

  render() {
    return (
      <div className='cohortBackground'>
        <Segment basic textAlign='center'>
          <Header className='cohortHeader'>devCircle</Header>
          <Header className='cohortSubheader'>
            Please enter your access code.
          </Header>
          <Form className='cohortsignupInput' onChange={this.handleCohortCodeChange} onSubmit={this.handleCohortCodeButton}>
            <Form.Input size='huge' action='Sign Up' placeholder='Enter code...'/>
          </Form>
          <p className='cohortaccessDenied'>Sorry, your code is not valid. Please try again.</p>
        </Segment>
      </div>
    )
  }
}

export default CohortLogin
