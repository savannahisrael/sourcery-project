import React, { Component } from 'react';
import { Form, Label, Icon, Container, Segment, Header, Image } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import './createProject.css';
// import gitTopics from '../../utils/gitTopics.js';
import axios from 'axios';

const techOptions2 = [];

const techOptions = [
  { key: 'js', text: 'JavaScript', value: 'javascript' },
  { key: 'py', text: 'Python', value: 'python' },
  { key: 'rb', text: 'Ruby', value: 'ruby' },
  { key: 'ph', text: 'PHP', value: 'php' },
  { key: 'c#', text: 'C#', value: 'c#' },
  { key: 'jv', text: 'Java', value: 'java' },
  { key: 'go', text: 'Go', value: 'go' },
  { key: 'c++', text: 'C++', value: 'c++' },
  { key: 'sw', text: 'Swift', value: 'swift' },
  { key: 'hc', text: 'HTML/CSS', value: 'html+css' },
]

const memberOptions = [
  { key: '1', text: '1', value: '1' },
  { key: '2', text: '2', value: '2' },
  { key: '3', text: '3', value: '3' },
  { key: '4', text: '4', value: '4' },
  { key: '5', text: '5', value: '5' },
  { key: '6', text: '6', value: '6' }
]

class CreateProjectForm extends Component {
  state = {
    userID: {},
    projects: [],
    projectNameInput: '',
    startDateInput: '',
    projectDurationInput: '',
    projectSummaryInput: '',
    mainTechnologyInput: '',
    otherTechnologiesInput: '',
    projectDetailsInput: '',
    membersWantedInput: '',
    googleLinkInput: '',
    trelloLinkInput: '',
    repoLinkInput: '',
    deployLinkInput: ''
  };

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
      console.log('Catching Error: ', error);
    });
  }

  handleprojectNameChange = (event) => {
    this.setState({ projectNameInput: event.target.value });
  }

  handleStartDateChange = (event) => {
    this.setState({ startDateInput: event.target.value });
  }

  handleProjectDurationChange = (event) => {
    this.setState({ projectDurationInput: event.target.value });
  }

  handleProjectSummaryChange = (event) => {
    this.setState({ projectSummaryInput: event.target.value });
  }

  handleMainTechnologyChange = (event) => {
    this.setState({ mainTechnologyInput: event.target.value });
  }

  handleOtherTechnologiesChange = (event) => {
    this.setState({ otherTechnologiesInput: event.target.value });
  }

  handleProjectDetailsChange = (event) => {
    this.setState({ projectDetailsInput: event.target.value });
  }

  handleMembersWantedChange = (event) => {
    this.setState({ membersWantedInput: event.target.value });
  }

  handleGoogleLinkChange = (event) => {
    this.setState({ googleLinkInput: event.target.value });
  }

  handleTrelloLinkChange = (event) => {
    this.setState({ trelloLinkInput: event.target.value });
  }

  handleRepoLinkChange = (event) => {
    this.setState({ repoLinkInput: event.target.value });
  }

  handleDeployLinkChange = (event) => {
    this.setState({ deployLinkInput: event.target.value });
  }

  handleSubmitButton = (event) => {
    event.preventDefault();
    axios.post('../api/projectNew', {
      name: this.state.projectNameInput,
      summary: this.state.projectSummaryInput,
      description: this.state.projectDetailsInput,
      primary_language: this.state.mainTechnologyInput,
      tech_tags: this.state.otherTechnologiesInput,
      start_date: this.state.startDateInput,
      duration: this.state.projectDurationInput,
      members_wanted: this.state.membersWantedInput,
      google_drive_link: this.state.googleLinkInput,
      trello_link: this.state.trelloLinkInput,
      repo_link: this.state.repoLinkInput,
      deploy_link: this.state.deployLinkInput
    }).then((res) => {
      console.log(res.data);
    });
  }

  // handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <div className='createBackground'>
        <Navbar currentPage='create' />
        <Segment basic textAlign='center' vertical className='createBanner'>
          <Container>
            <Header className='createHeader'>
              Create a Project
            </Header>
          </Container>
        </Segment>
        <Container className='createContainer'>
          <Segment>
            <Form size='large' class='form' onSubmit={this.handleSubmitButton}>
              <Form.Input label='Project Name' placeholder='devCircle' onChange={this.handleprojectNameChange}/>
              <Form.Input label='Start Date' placeholder='Oct 1, 2017' onChange={this.handleStartDateChange}/>
              <Form.Input label='Project Length' placeholder='in weeks' onChange={this.handleProjectDurationChange}/>
              <Form.TextArea label='Project Summary' placeholder='Summarize your project...' onChange={this.handleProjectSummaryChange}/>
              <Form.Select label='Main Technology' options={techOptions} placeholder='e.g. JavaScript' onChange={this.handleMainTechnologyChange}/>
              <Form.TextArea label='Other Technologies' placeholder='MySql, HTML5, CSS3' onChange={this.handleOtherTechnologiesChange}/>
              <Form.TextArea label='Project Details' placeholder='Describe your project...' onChange={this.handleProjectDetailsChange}/>
              <Form.Select label='Members Wanted' options={memberOptions} onChange={this.handleMembersWantedChange}/>
              <Form.Input label='Google Drive Link' onChange={this.handleGoogleLinkChange}/>
              <Form.Input label='Trello Link' onChange={this.handleTrelloLinkChange}/>
              <Form.Input label='Github Link' onChange={this.handleRepoLinkChange}/>
              <Form.Input label='Deployment Link' onChange={this.handleDeployLinkChange}/>
              <Form.Button>Create Project</Form.Button>
            </Form>
          </Segment>
        </Container>
        <Image src='../../../assets/images/createProj.png'className='imageTest'/>
      </div>
    )
  }
}

export default CreateProjectForm
