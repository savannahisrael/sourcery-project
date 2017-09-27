import React, { Component } from 'react';
import ReactRotatingText from 'react-rotating-text';
import { Button, Container,Divider, Grid, Header, Form, Icon, Image, List, Menu, Segment, Visibility, Card, Item } from 'semantic-ui-react';
import Tiles from '../../Common/projectTiles';
import SignUpInput from '../../Common/signUp';
import Navbar from "../../Common/landingNavbar";
// import BackgroundImg from '../../../assets/images/home.png';
import './landing.css';
// import API from '../../../../server/app/routes.js';
import axios from 'axios';

export default class landingPage extends Component {

  state = {
    userID: {},
    projects: [],
    cohort: ""
  };

  // On page load, get all projects and send to this.state.projects
  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
    axios.get('../api/projects').then((res) => {
      this.setState({ projects: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ');
      console.log(error);
    });
    axios.get('../auth/checkLoggedIn').then((res) => {
      this.setState({ userID: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ');
      console.log(error);
    });
  }

  renderFeaturedProjects = () => {

  }

  handleLoginButton = () => {
    axios.get('../auth/github').then((res) => {
      console.log(res.data);
    });
  }

  handleSignupButton = () => {
    let form = document.querySelector('.signUpForm');
    let button = document.querySelector('.signUpButton');
    form.style.display = 'block';
    button.style.display = 'none';
  }

  handleCohortCodeButton = () => {
    axios.get('../auth/memberCohort').then((res) => {
      console.log(res.data);
    });
  }

  handleCohortCodeChange = (event) => {
    this.setState({ cohort: event.target.value });
  }

  render() {
    return (
      <div>
        <Segment className='aboveTheFold' basic>
          <Navbar currentPage='landing' />
          <div>
          <Container textAlign='center'>
            <Grid >
              <Grid.Column width={8} className='landingGrid'>
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
                <br/>
                {/* <Button className='cohortCodeButton' secondary size='huge' onClick={this.handleLoginButton}>
                  Log in with Github
                </Button> */}
              </Grid.Column>
              <Grid.Column width={8} className='img'/>
            </Grid>
          </Container>
          </div>
        </Segment>

        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8} className=''>
                <Header className='landingWho'>
                HOW <br/> CAN <br/> WE <br/> HELP
                </Header>
              </Grid.Column>
              <Grid.Column width={8} className='iconSection'>
                <Item.Group relaxed>
                  <Item>
                    <Icon name='calendar outline'className='icon'/>                
                    <Item.Content>
                      <Item.Header className='itemHeader' >Simplify Planning</Item.Header>
                      <Item.Meta className='itemMeta'>Easily turn ideas into an actionable plan to achieve success.</Item.Meta>
                    </Item.Content>
                  </Item>
                  <br/>
                  <Item>
                    <Icon name='users' className='icon'/> 
                    <Item.Content>
                      <Item.Header className='itemHeader'>Facilitate Collaboration</Item.Header>
                      <Item.Meta className='itemMeta'>Centralize communication with team members.</Item.Meta>
                    </Item.Content>
                  </Item>       
                  <br/>       
                  <Item>
                    <Icon name='fighter jet' className='icon'/>               
                    <Item.Content>
                      <Item.Header className='itemHeader'>Streamline Workflow</Item.Header>
                      <Item.Meta className='itemMeta'>View status for all your team projects in one place.</Item.Meta>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row textAlign='centered'> 
              <Header className='quote'>
                We’re here to help you keep up with the latest technologies and stay in touch with your fellow Boot Campers.
              </Header>
            </Grid.Row>
          </Grid>
        </Container>
      <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as='h3' style={{ fontSize: '2em' }}>devCircle’s Features at a Glance</Header>
                <p style={{ fontSize: '1.33em' }}>
                Create team projects <br/>
                Collaboration: sign up to contribute to projects or create projects for others to participate in<br/>
                Engage with your team members: Be a part of the conversation as a group.<br/>
                Explore: Find new projects based on technologies to participate in         <br/>       
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"What a Company"</Header>
                <p style={{ fontSize: '1.33em' }}>That is what they all say about us</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>"I shouldn't have gone with their competitor."</Header>
                <p style={{ fontSize: '1.33em' }}>
                  <Image avatar src='/assets/images/avatar/large/nan.jpg' />
                  <b>Nan</b> Chief Fun Officer Acme Toys
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>Breaking The Grid, Grabs Your Attention</Header>
            <p style={{ fontSize: '1.33em' }}>
              Instead of focusing on content creation and hard work, we have learned how to master the art of doing
              nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic
              and worth your attention.
            </p>
            <Button as='a' size='large'>Read More</Button>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>Did We Tell You About Our Bananas?</Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really
              true.
              It took years of gene splicing and combinatory DNA research, but our bananas can really dance.
            </p>
            <Button as='a' size='large'>I'm Still Quite Interested</Button>
          </Container>
        </Segment>
      </div>
    )
  }
}
