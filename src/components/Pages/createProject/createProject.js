import React, { Component } from 'react';
import { Form, Label, Icon, Container, Segment, Header, Image } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import './createProject.css';
import techSelection from '../../../utils/techTags.json';
import axios from 'axios';

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
    const regex = /^[a-zA-Z0-9-_]+$/;
    const warning = document.querySelector('.warning');
    const asterisk = document.getElementsByClassName('asterisk');
    warning.style.display = 'none';
    if (this.state.projectNameInput === '' || this.state.mainTechnologyInput === '' || this.state.membersWantedInput === '') {
      warning.innerHTML = '*Please complete all required fields';
      warning.style.display = 'block';
      for (let i = 0; i < asterisk.length; i++) {
        asterisk[i].style.display = 'block';
      }
    }
    else if (this.state.projectNameInput.search(regex) === -1) {
      warning.innerHTML = '*Project title may only contain letters, numbers, dashes, and underscores';
      warning.style.display = 'block';
      for (let i = 0; i < asterisk.length; i++) {
        asterisk[0].style.display = 'block';
      }
    }
    else {
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
        window.location = `../${this.state.userID.cohort}/${this.state.userID.username}/app/${this.state.projectNameInput}`;
      });
    }
  }

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
            <span className='asterisk'>*</span>
            <Form.Input label='Project Name' onChange={this.handleprojectNameChange}/>
            <Form.Input label='Start Date' placeholder='MM/DD/YYYY' onChange={this.handleStartDateChange}/>
            <Form.Input label='Project Length' placeholder='in weeks' onChange={this.handleProjectDurationChange}/>
            <Form.TextArea label='Project Summary' placeholder='Keep it short and sweet' onChange={this.handleProjectSummaryChange}/>
            <span className='asterisk'>*</span>
            <Form.Select search label='Main Technology' options={techSelection} placeholder='e.g. JavaScript' onChange={this.handleMainTechnologyChange}/>
            <Form.Select multiple search label='Other Technologies' options={techSelection} onChange={this.handleOtherTechnologiesChange}/>
            <Form.TextArea label='Project Details' placeholder='Describe your project in detail...' onChange={this.handleProjectDetailsChange}/>
            <span className='asterisk'>*</span>
            <Form.Select label='Team Size' options={memberOptions} onChange={this.handleMembersWantedChange}/>
            <Form.Input label='Google Drive Link' onChange={this.handleGoogleLinkChange}/>
            <Form.Input label='Trello Link' onChange={this.handleTrelloLinkChange}/>
            <Form.Input label='Github Link' onChange={this.handleRepoLinkChange}/>
            <Form.Input label='Deployment Link' onChange={this.handleDeployLinkChange}/>
            <Form.Button>Create Project</Form.Button>
          </Form>
          <p className='warning'></p>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default CreateProjectForm
