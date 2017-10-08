import React, { Component } from 'react';
import { Form, Container, Segment, Header, Button} from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import './createProject.css';
import techSelection from '../../../utils/techTags.json';
import axios from 'axios';
import moment from 'moment';

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
    text: 'Javascript', value: 'javascript'
  },
  {
    text: 'Python', value: 'python'
  },
  {
    text: 'Ruby', value: 'ruby'
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
    text: 'Java', value: 'java'
  },
  {
    text: 'Go', value: 'go'
  },
  {
    text: 'Swift', value: 'swift'
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
    mode: 'create',
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
      primary_language: '',
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
    this.determineMode(...this.getParams()) ? 
    this.fetchProjectData(...this.getParams())
    .then(owner => this.checkLoggedIn())
    .then(user => {
      if (this.state.userID.user.github.login !== this.state.owner_id.github.login) {
        const [cohort, username, project] = this.getParams();
        window.location = `/${cohort}/${username}/app/${project}`
      }
    })
    : this.checkLoggedIn();
    
  }

  getParams = () => [this.props.match.params.cohort, this.props.match.params.username, this.props.match.params.project];

  determineMode = (cohort, username, project) => {
    if (cohort && username && project) {
      console.log('edit mode!')
      this.setState({mode: 'edit'})
      return true;
    } else {
      return false;
    }
  }

  fetchProjectData = (cohort, username, project) => {
    return axios.get(`/api/projectData/${cohort}/${username}/app/${project}`).then(res => {
      console.log('Project data:',res.data);
      const p = res.data[0];
      this.setState({ 
        project:{
          _id: p._id,
          name: p.name,
          summary: p.summary,
          description: p.description,
          tech_tags: p.tech_tags,
          start_date: moment(p.start_date).format('YYYY-MM-DD'),
          primary_language: p.primary_language,
          duration: p.duration,
          members_wanted: p.members_wanted,
          google_drive_link: p.google_drive_link,
          trello_link: p.trello_link,
          repo_link: p.repo_link,
          deploy_link: p.deploy_link,
          status: p.status
        }
      });
      this.setState({owner_id: p.owner_id})
      return res.data[0].owner_id;
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
  }

  checkLoggedIn = () => {
    return axios.get('/auth/checkLoggedIn').then(res => {
      this.setState({ userID: res.data });
      console.log("state:", this.state)
      console.log(res.data);
      return res.data;
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
    if (this.state.project.name.search(regex) === -1) {
      warning.innerHTML = '*Project title may only contain letters, numbers, dashes, and underscores';
      warning.style.display = 'block';
    }
    else {
      if (this.state.mode === 'create') {
        axios.post('/api/projectNew', this.state.project)
        .then(res => {
          console.log(res.data);
          window.location = `/${this.props.match.params.cohort}/${this.state.userID.user.github.login}/app/${this.state.project.name}`;
        });
      } else {
        console.log("in else statement for editing of project");
        axios.patch('/api/projects', {
          projectId: this.state.project._id,
          update: this.state.project
        })
        .then(window.location = `/${this.props.match.params.cohort}/${this.state.userID.user.github.login}/app/${this.state.project.name}`)
        .catch(err => console.log(err));
      }

    }
  }


  render(props) {
    const { value } = this.state
    console.log("this is state before the render:", this.state);

    return (
      <div className='createBackground'>
        <Navbar currentPage='create' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
        <Segment basic textAlign='center' vertical className='createBanner'>
          <Container>
            <Header className='createHeader'>
              {this.state.mode === 'create' ? 
              'Create a Project' :
              `Edit ${this.state.project.name}`}
            </Header>
          </Container>
        </Segment>
        <Container className='createContainer' text>
          <Segment>
          <Form size='large' class='form' onSubmit={this.handleSubmitButton}>
            {this.state.mode === 'edit' ? 
            <Form.Select name='status' label='Project Status' options={statusOptions} 
              onChange={this.handleStatusChange} value={this.state.project.status}/> : ''}
            <Form.Input name='name' label='Project Name' 
              onChange={this.handleInputChange} required value={this.state.project.name}/>
            <Form.Input name='start_date' label='Start Date'placeholder='MM/DD/YYYY' 
              onChange={this.handleInputChange} type='date' required value={this.state.project.start_date}/>
            <Form.Input name='duration' label='Project Length'placeholder='in weeks' 
              onChange={this.handleInputChange} type='number' min='1' max='52' required value={this.state.project.duration}/>
            <Form.TextArea name='summary' label='Project Summary' placeholder='Keep it short and sweet' 
              onChange={this.handleInputChange} max='140' required value={this.state.project.summary}/>
            <Form.Select name='primary_language' search label='Primary Language' options={languageOptions}
              onChange={this.handleMainTechnologyChange} required value={this.state.project.primary_language}/>
            <Form.Select name='tech_tags' multiple search label='Other Technologies' options={techSelection} 
              onChange={this.handleOtherTechnologiesChange} value={this.state.project.tech_tags}/>
            <Form.TextArea name='description' label='Project Details' placeholder='Describe your project in detail...' 
              onChange={this.handleInputChange} value={this.state.project.description}/>
            <Form.Select name='members_wanted' label='Team Size' options={memberOptions} 
              onChange={this.handleMembersWantedChange} type='number' required value={this.state.project.members_wanted}/>
            <Form.Input name='google_drive_link' type='url' label='Google Drive Link' 
              onChange={this.handleGoogleLinkChange} value={this.state.project.google_drive_link}/>
            <Form.Input name='trello_link' type='url' label='Trello Link' 
              onChange={this.handleTrelloLinkChange} value={this.state.project.trello_link}/>
            <Form.Input name='repo_link' type='url' label='Github Link' 
              onChange={this.handleRepoLinkChange} value={this.state.project.repo_link}/>
            <Form.Input name='deploy_link' type='url' label='Deployment Link'
              onChange={this.handleDeployLinkChange} value={this.state.project.deploy_link}/>
            <Button className='createButton'>
            {this.state.mode === 'create' ? 
            'Create Project' :
            'Save Changes'}
            </Button>
          </Form>
          <p className='warning'></p>
          </Segment>
        </Container>
      </div>
    )
  }
}

export default CreateProjectForm;