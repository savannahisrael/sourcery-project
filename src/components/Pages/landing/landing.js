import React, {
  Component
} from 'react';
import {
  Route,
  Redirect
} from 'react-router';
import ReactRotatingText from 'react-rotating-text';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Form,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Card
} from 'semantic-ui-react';
import Tiles from '../../Common/projectTiles';
import SignUpInput from '../../Common/signUp';
import Navbar from "../../Common/navbar";
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
      this.setState({
        projects: res.data
      });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ');
      console.log(error);
    });
    axios.get('../auth/checkLoggedIn').then((res) => {
      this.setState({
        userID: res.data
      });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ');
      console.log(error);
    });
  }

  renderFeaturedProjects = () => {

  }

  handleLoginButton = () => {
    // axios.get('http://cors.io/?http://localhost:4000/auth/github');
    window.location = '../auth/github';

  }

  handleSignupButton = () => {
    let form = document.querySelector('.signUpForm');
    let button = document.querySelector('.signUpButton');
    form.style.display = 'block';
    button.style.display = 'none';
  }

  handleCohortCodeButton = () => {
    console.log("button clicked");
    axios.get('../auth/cohortVerify', {
      params: {
        cohortCode: this.state.cohort
      }
    }).then(res => {
      if (res.data.cohortExists) {
        let proxyURL = "https://cors-anywhere.herokuapp.com/"
        axios.get(proxyURL + '/dashboard')
      } else {
        console.log("Cohort code incorrect");
      }
    });
  }

  handleCohortCodeChange = (event) => {
    this.setState({
      cohort: event.target.value
    });
  }

  render() {
    return ( < div >
      <
      Navbar currentPage = 'landing' / >
      <
      Segment textAlign = 'center'
      /*style={{ minHeight: 1080, padding: '1em 0em', backgroundImage: `url(${BackgroundImg})`, flex: 1, resizeMode: 'cover'
      }}*/

      basic >
      <
      div className = 'aboveTheFold' >
      <
      Container text >
      <
      Header as = 'h1'
      content = 'devCircle'
      style = {
        {
          fontSize: '6em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '.5em'
        }
      }
      /> <Header as = 'h2'
      style = {
        {
          fontSize: '2em',
          fontWeight: 'normal',
        }
      } >
      Create your own team projects < Header.Subheader >
      <
      ReactRotatingText style = {
        {
          fontSize: '2em',
          fontWeight: 'normal'
        }
      }
      items = {
        ['to learn new technologies', 'to facilitate collaboration', 'to streamline workflow', 'to simplify planning']
      }
      /> </Header.Subheader > < /Header> <br / >
      <
      Button className = 'signUpButton'
      primary size = 'huge'
      onClick = {
        this.handleSignupButton
      } >
      Sign Up < /Button> <Form className = 'signUpForm'
      onChange = {
        this.handleCohortCodeChange
      }
      onSubmit = {
        this.handleCohortCodeButton
      } >
      <
      Form.Input size = 'huge'
      action = 'Sign Up'
      placeholder = 'Enter code...' / >
      <
      /Form> <br / >
      <
      Button className = 'cohortCodeButton'
      secondary size = 'huge'
      onClick = {
        this.handleLoginButton
      } >
      Log in with Github < /Button> </Container > < /div> </Segment > < Container >
      <
      Grid columns = {
        5
      } >
      <
      Grid.Row >
      <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> < /
      Grid.Row > <
      Grid.Row >
      <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> <
      Grid.Column > { /* <Tiles/> */ } <
      /Grid.Column> < /
      Grid.Row > <
      /Grid> < /
      Container > <
      Container >
      <
      Grid columns = {
        3
      } >
      <
      Grid.Row >
      <
      Header as = 'h2'
      icon >
      <
      Icon name = 'calendar outline' / >
      Simplify Planning <
      Header.Subheader >
      Easily turn ideas into an actionable plan to achieve success. <
      /Header.Subheader> < /
      Header > <
      Header as = 'h2'
      icon >
      <
      Icon name = 'users' / >
      Facilitate Collaboration <
      Header.Subheader >
      Centralize communication with team members. <
      /Header.Subheader> < /
      Header > <
      Header as = 'h2'
      icon >
      <
      Icon name = 'fighter jet' / >
      Streamline Workflow <
      Header.Subheader >
      View status
      for all your team projects in one place. <
      /Header.Subheader> < /
      Header > <
      /Grid.Row> < /
      Grid > <
      /Container> <
      Segment style = {
        {
          padding: '8em 0em'
        }
      }
      vertical >
      <
      Grid container stackable verticalAlign = 'middle' >
      <
      Grid.Row >
      <
      Grid.Column width = {
        8
      } >
      <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > We Help Companies and Companions < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } >
      We can give your company superpowers to do things that they never thought possible.Let us delight
      your customers and empower your needs...through pure data analytics. <
      /p> <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > We Make Bananas That Can Dance < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } >
      Yes that 's right, you thought it was the stuff of dreams, but even bananas can be bioengineered. < /
      p > <
      /Grid.Column> <
      Grid.Column floated = 'right'
      width = {
        6
      } >
      <
      Image bordered rounded size = 'large'
      src = '/assets/images/wireframe/white-image.png' /
      >
      <
      /Grid.Column> < /
      Grid.Row > <
      Grid.Row >
      <
      Grid.Column textAlign = 'center' >
      <
      Button size = 'huge' > Check Them Out < /Button> < /
      Grid.Column > <
      /Grid.Row> < /
      Grid > <
      /Segment> <
      Segment style = {
        {
          padding: '0em'
        }
      }
      vertical >
      <
      Grid celled = 'internally'
      columns = 'equal'
      stackable >
      <
      Grid.Row textAlign = 'center' >
      <
      Grid.Column style = {
        {
          paddingBottom: '5em',
          paddingTop: '5em'
        }
      } >
      <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > "What a Company" < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } > That is what they all say about us < /p> < /
      Grid.Column > <
      Grid.Column style = {
        {
          paddingBottom: '5em',
          paddingTop: '5em'
        }
      } >
      <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > "I shouldn't have gone with their competitor." < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } >
      <
      Image avatar src = '/assets/images/avatar/large/nan.jpg' / >
      <
      b > Nan < /b> Chief Fun Officer Acme Toys < /
      p > <
      /Grid.Column> < /
      Grid.Row > <
      /Grid> < /
      Segment > <
      Segment style = {
        {
          padding: '8em 0em'
        }
      }
      vertical >
      <
      Container text >
      <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > Breaking The Grid, Grabs Your Attention < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } >
      Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention. <
      /p> <
      Button as = 'a'
      size = 'large' > Read More < /Button> <
      Divider as = 'h4'
      className = 'header'
      horizontal style = {
        {
          margin: '3em 0em',
          textTransform: 'uppercase'
        }
      } >
      <
      a href = '#' > Case Studies < /a> < /
      Divider > <
      Header as = 'h3'
      style = {
        {
          fontSize: '2em'
        }
      } > Did We Tell You About Our Bananas ? < /Header> <
      p style = {
        {
          fontSize: '1.33em'
        }
      } >
      Yes I know you probably disregarded the earlier boasts as non - sequitur filler content, but its really true.It took years of gene splicing and combinatory DNA research, but our bananas can really dance. <
      /p> <
      Button as = 'a'
      size = 'large' > I 'm Still Quite Interested</Button> < /
      Container > <
      /Segment> < /
      div >
    )
  }
}