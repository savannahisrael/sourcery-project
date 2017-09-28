import React, { Component } from 'react';
import { Form, Label, Icon, Container, Segment, Header, Image } from 'semantic-ui-react';
import './cohortLogin.css';
import axios from 'axios';

class CohortLogin extends Component {
  state = {
    userID: {},
    cohort: ''
  };

  handleCohortCodeChange = (event) => {
    this.setState({
      cohort: event.target.value
    });
  }

  handleCohortCodeButton = () => {
    console.log("button clicked");
    axios.get('../auth/cohortVerify', {
      params: {
        cohortCode: this.state.cohort
      }
    }).then(res => {
      if (res.data.cohortExists) {
        window.location = `../../${this.userID.cohort}/${this.userID.username}/dashboard`;
      } else {
        console.log("Cohort code incorrect");
        const accessDenied = document.querySelector('.accessDenied');
        accessDenied.style.display = 'block';
      }
    });
  }

  render() {
    return (
      <div>
        <Segment className='background'>
          <Header className='devCircle' textAlign='center'>devCircle</Header>
          <Form onChange={this.handleCohortCodeChange} onSubmit={this.handleCohortCodeButton}>
            <Form.Input className='signupInput' size='huge' action='Sign Up' placeholder='Enter code...'/>
          </Form>
          <Header className='accessDenied' textAlign='center'>Please enter a valid access code</Header>
        </Segment>
      </div>
    )
  }
}

export default CohortLogin
