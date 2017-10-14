import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ReactRotatingText from 'react-rotating-text';
import { Button, Container,Grid, Header, Form, Icon, Image, Segment, Item } from 'semantic-ui-react';
import Navbar from "../../Common/landingNavbar";
import BackgroundImg from '../../../assets/images/background.png';
import './landing.css';
import axios from 'axios';

export default class landingPage extends Component {

  state = {
    projects: [],
    cohort: "",
    userID: this.props.auth
  };

  handleLoginButton = () => {
    window.location = '/auth/github';
  }

  handleSignupButton = () => {
    let form = document.querySelector('.signUpForm');
    let button = document.querySelector('.signUpButton');
    form.style.display = 'block';
    button.style.display = 'none';
  }

  handleCohortCodeButton = () => {
    console.log("button clicked");
    axios.get('/auth/cohortVerify', {
      params: {
        cohortCode: this.state.cohort
      }
    }).then(res => {
      if (res.data.cohortExists) {
        window.location = '/auth/github'
      } else {
        console.log("Cohort code incorrect");
        const noAccess = document.querySelector('.noAccess');
        noAccess.style.display = 'block';
      }
    });
  }

  handleCohortCodeChange = (event) => {
    this.setState({
      cohort: event.target.value
    });
  }

  render() {
    if (this.props.auth.login) {
      return (<Redirect to="/0417/explore"/>)
    } else {
      return (
        <div>
          <Segment className='aboveTheFold' basic>
            <Navbar currentPage='landing' handleLoginButton={this.handleLoginButton} />
            <div>
            <Container textAlign='center'>
              <Grid className='landingGrid'>
                <Grid.Column width={8}>
                  <Header className='landingHeader'content='devCircle'/>
                  <Header className='landingSubheader'>
                    Create your own team projects
                  </Header>
                  <Header>
                    <ReactRotatingText className='landingRotating' items={['to learn new technologies', 'to facilitate collaboration', 'to streamline workflow', 'to simplify planning']} />
                  </Header>
                  <br/>
                  <Button className='signUpButton' primary size='huge' onClick={this.handleSignupButton}>
                    Register
                  </Button>
                  <Form className='signUpForm' onChange={this.handleCohortCodeChange} onSubmit={this.handleCohortCodeButton}>
                    <Form.Input size='huge' action='Sign Up' placeholder='Enter code...'/>
                  </Form>
                  <p className='noAccess'>Please enter a valid access code.</p>
                  <br/>
                </Grid.Column>
                <Grid.Column width={8}>
                  <Image className='landingImg' src={BackgroundImg} size='large'/>
                </Grid.Column>
              </Grid>
            </Container>
            </div>
          </Segment>

          <Container className='landingContainer'>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column className='iconSection'>
                    <Item>
                      <Icon name='cubes'className='landingIcon'/>                
                      <Item.Header className='itemHeader' >Build</Item.Header><br/><br/>
                      <Item.Meta className='itemMeta'>Practice the basics to cutting edge development techniques. No matter what skill level, create projects or join projects you're interested in to gain hands-on experience.</Item.Meta>
                    </Item>
                  </Grid.Column>
                <Grid.Column className='iconSection'>
                    <Item>
                      <Icon name='code' className='landingIcon'/> 
                      <Item.Header className='itemHeader'>Learn</Item.Header> <br/><br/>
                      <Item.Meta className='itemMeta'> There will always be new, hot technologies that we’ll need to learn if we want to stay relevant. So, we decided to create a platform where we could build upon the foundational knowledge we gained during our boot camp. </Item.Meta>
                    </Item>       
                  </Grid.Column>  
                  <Grid.Column className='iconSection'>
                    <Item>
                      <Icon name='users' className='landingIcon'/>            
                      <Item.Header className='itemHeader'>Connect</Item.Header><br/><br/>
                      <Item.Meta className='itemMeta'>Stay in touch with your peers from boot camp. All members of your cohort are given access to the system where they can continue working together and collaborating on projects and technologies that interest them.</Item.Meta>
                    </Item>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row textAlign='centered'> 
                <Header className='quote'>
                  We’re here to help you keep up with the latest technologies and stay in touch with your fellow Boot Campers.
                </Header>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      )
    } 
  }
}


