import React, { Component } from 'react';
import { Form, Container, Segment, Header, Button} from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import './createProject.css';
import techSelection from '../../../utils/techTags.json';
import axios from 'axios';

const memberOptions = [
  { key: '1', text: '1', value: 1 },
  { key: '2', text: '2', value: 2 },
  { key: '3', text: '3', value: 3 },
  { key: '4', text: '4', value: 4 },
  { key: '5', text: '5', value: 5 },
  { key: '6', text: '6', value: 6 }
]

const languageOptions = [
  {
    text: 'Javascript', value: 'Javascript'
  },
  {
    text: 'Python', value: 'Python'
  },
  {
    text: 'Ruby', value: 'Ruby'
  },
  {
    text: 'PHP', value: 'PHP'
  },
  {
    text: 'C#', value: 'C#'
  },
  {
    text: 'C++', value: 'C++'
  },
  {
    text: 'Java', value: 'Java'
  },
  {
    text: 'Go', value: 'Go'
  },
  {
    text: 'Swift', value: 'Swift'
  },
  {
    text: 'HTML/CSS', value: 'HTML/CSS'
  }
]

const statusOptions = [
  {
    text: 'Proposed',
    value: 'proposal'
  },
  {
    text: 'In Progress',
    value: 'in-progress'
  },
  {
    text: 'Completed',
    value: 'completed'
  }
]

class CreateProjectForm extends Component {
  state = {
    userID: {
      login: false,
      user: {
        github: {
          login: '',
          avatar_url: '',
          name: ''
        }
      }
    },
    project: {
      name: '',
      summary: '',
      description: '',
      tech_tags: [],
      start_date: '',
      duration: 0,
      members_wanted: 0,
      google_drive_link: '',
      trello_link: '',
      repo_link: '',
      deploy_link: '',
      status: 'proposal'
    }
  };

  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
    axios.get('/auth/checkLoggedIn').then((res) => {
      this.setState({ userID: res.data });
      console.log("state:", this.state)
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ', error);
    });
  }

  handleMainTechnologyChange = (e, {value}) => {
    this.setState({
      project: {
        ...this.state.project,
        primary_language: value
      }
    });
  }

  handleOtherTechnologiesChange = (e, {value}) => {
    this.setState({
      project: { 
        ...this.state.project,
        tech_tags: value 
      }
    });
  }

  handleMembersWantedChange = (e, {value}) => {
    this.setState({
      project: {
        ...this.state.project,
        members_wanted: value 
      }
    });
  }

  handleStatusChange = (e, {value}) => {
    this.setState({ 
      project: {
        ...this.state.project,
        status: value
      }
    });
  }

  handleInputChange = event => {
    this.setState({ 
      project: {
        ...this.state.project,
        [event.target.name]: event.target.value
      }
    });
  }

  handleSubmitButton = event => {
    event.preventDefault();
    const regex = /^[a-zA-Z0-9-_]+$/;
    const warning = document.querySelector('.warning');
    const asterisk = document.getElementsByClassName('asterisk');
    warning.style.display = 'none';
    // if (this.state.project.name === '' || this.state.project.primary_language === '' || this.state.membersWantedInput === '') {
    //   warning.innerHTML = '*Please complete all required fields';
    //   warning.style.display = 'block';
    //   // for (let i = 0; i < asterisk.length; i++) {
    //   //   asterisk[i].style.display = 'block';
    //   // }
    // }
    if (this.state.project.name.search(regex) === -1) {
      warning.innerHTML = '*Project title may only contain letters, numbers, dashes, and underscores';
      warning.style.display = 'block';
      // for (let i = 0; i < asterisk.length; i++) {
      //   asterisk[0].style.display = 'block';
      // }
    }
    else {
      axios.post('/api/projectNew', this.state.project)
      .then(res => {
        console.log(res.data);
        window.location = `../${this.props.match.params.cohort}/${this.state.userID.user.github.login}/app/${this.state.project.name}`;
      });
    }
  }

  // this.props.match.params.username

  render(props) {
    const { value } = this.state
    console.log("this is state before the render", this.state);

    return (
      <div className='createBackground'>
        <Navbar currentPage='create' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
        <Segment basic textAlign='center' vertical className='createBanner'>
          <Container>
            <Header className='createHeader'>
              Create a Project
            </Header>
          </Container>
        </Segment>
        <Container className='createContainer' text>
          <Segment>
          <Form size='large' class='form' onSubmit={this.handleSubmitButton}>
            <Form.Select name='status' label='Project Status' options={statusOptions} 
              onChange={this.handleStatusChange} disabled/>
            <Form.Input name='name' label='Project Name' 
              onChange={this.handleInputChange} required/>
            <Form.Input name='start_date' label='Start Date'placeholder='MM/DD/YYYY' 
              onChange={this.handleInputChange} type='date' required/>
            <Form.Input name='duration' label='Project Length'placeholder='in weeks' 
              onChange={this.handleInputChange} type='number' min='1' max='52'  required/>
            <Form.TextArea name='summary' label='Project Summary' placeholder='Keep it short and sweet' 
              onChange={this.handleInputChange} max='140' required/>
            <Form.Select name='primary_language' search label='Main Technology' options={languageOptions}
              onChange={this.handleMainTechnologyChange} required/>
            <Form.Select name='tech_tags' multiple search label='Other Technologies' options={techSelection} 
              onChange={this.handleOtherTechnologiesChange}/>
            <Form.TextArea name='description' label='Project Details' placeholder='Describe your project in detail...' 
              onChange={this.handleInputChange}/>
            <Form.Select name='members_wanted' label='Team Size' options={memberOptions} 
              onChange={this.handleMembersWantedChange} type='number' required/>
            <Form.Input name='google_drive_link' type='url' label='Google Drive Link' onChange={this.handleGoogleLinkChange}/>
            <Form.Input name='trello_link' type='url' label='Trello Link' onChange={this.handleTrelloLinkChange}/>
            <Form.Input name='repo_link' type='url' label='Github Link' onChange={this.handleRepoLinkChange}/>
            <Form.Input name='deploy_link' type='url' label='Deployment Link' onChange={this.handleDeployLinkChange}/>
            <Form.Button className='createButton'>Create Project</Form.Button>
          </Form>
          <p className='warning'></p>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default CreateProjectForm
