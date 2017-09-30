import React, { Component } from "react";
import { Tab, Label, Container, Image, Header, Segment, Grid, Divider, Button, Item, Icon, Card } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import Chat from "../../Common/chat";
import MemberBlock from "./MemberBlock";
import './project.css';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

const socket = io();
const formatDate = date => moment(date).format('MM/DD/YYYY');


class Project extends Component {

  state = {
    _id: '',
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
    name: 'Loading',
    summary: 'Loading data...',
    description: 'Loading data...',
    tech_tags: [],
    start_date: '',
    duration: 0,
    members_wanted: 0,
    google_drive_link: "",
    trello_link: "",
    repo_link: "",
    deploy_link: "",
    chat: [],
    pending_members: [],
    members: [],
    owner_id: '',
    cohort_id: '',
    issues: [],
    pulls: [],
    contributors: [],
    priviledge: 'public'
  };

  // On page load, get project data and send to this.state.project
  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
    this.fetchProjectData()
    .then(repoLink => repoLink ? this.fetchGithubData(repoLink) : repoLink )
    .then(repoInfo => this.checkLoggedIn());

    socket.on('refreshMsg', data => {
     console.log("Refresh Msg Requested:", data);
     this.fetchProjectData();
    })

  }

  fetchProjectData = () => {
    return axios.get(`/api/projectData${this.props.location.pathname}`).then(res => {
      console.log('Project data:',res.data);
      this.setState({ ...res.data[0] });
      return res.data[0].repo_link
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
  }

  fetchGithubData = repo => {
    return axios.get('/api/github', {params: { repo }})
    .then(res => {
      const {issues, pulls, contributors} = res.data;
      this.setState({issues, pulls, contributors})
      return res.data;
    })
    .catch(err => console.log('Error in github pull:', err))
  }

  checkLoggedIn = () => {
    axios.get('/auth/checkLoggedIn').then(res => {
      // ------- Manual Auth Override
      // res.data = {
      //   login: true,
      //   _id: '59cd80c251fe492bb4096713',
      //   user: {
      //     github: {
      //       login: 'aarongaither',
      //       avatar_url: 'https://avatars1.githubusercontent.com/u/16161706?v=4&s=400',
      //       name: 'Aaron Gaither'
      //     }
      //   }
      // }
      if (res.data.login) {
        const curUser = res.data.user.github.login;
        if (this.state.owner_id.github.login === curUser) {
          this.setState({priviledge: 'owner'})
        } else if (this.state.members.find(m => m.github.login === curUser)) {
          this.setState({priviledge: 'member'})
        } else if (this.state.pending_members.find(m => m.github.login === curUser)) {
          this.setState({priviledge: 'pending'})
        }
      }
      this.setState({ userID: res.data });


      // ------- Manual Auth Overrides
      // this.setState({priviledge: 'owner'})
      // this.setState({priviledge: 'member'})
      // this.setState({priviledge: 'pending'})

      console.log('User:',res.data, 'priviledge:', this.state.priviledge);
    }).catch(error => {
      console.log('Catching Error while authing user: ', error);
    });
  }

  renderTeamMembers = () => {
    return this.state.members.map(member => {
      member.contributions = this.state.contributors.find(c => c.name === member.github.login )
      if (!member.contributions) {
        {
          member.contributions = {
              commits: 0,
              additions: 0,
              deletions: 0
          }
        }
      }
      return (
        <MemberBlock {...member} projectId={this.state._id} updateFunction={this.update} />
      )
    })
  }

  renderPendingMembers = () => {
    const DecisionButtons = (props) =>
    (<Card.Content extra>
      <div className='ui two buttons'>
        <Button fluid className='projectClose' onClick= {()=> this.declineJoin(props)}>Decline </Button>
        <Button fluid className='projectCheck' onClick= {()=> this.approveJoin(props)}>Approve </Button>
      </div>
    </Card.Content>)

    return this.state.pending_members.map(pending_member => (
      <Card className='projectRequest'>
        <Card.Content>
        <Header as='h3'>Pending Members</Header>
        <Divider/>
          <Image className='projectImage' shape='circular' src={pending_member.github.avatar_url} size='mini' verticalAlign='middle' /> <span> <strong> {pending_member.github.name} </strong> wants to join.</span>
        </Card.Content>
        {this.state.priviledge === 'owner' ? <DecisionButtons {...pending_member} /> : ''}
      </Card>
    ));
  }

  approveJoin = (props) =>{
    console.log(props)
    
    let update = {update:{
      $pull:{pending_members:props._id}, 
      $push:{members:props._id}
    }, projectId:this.state._id};
   
    axios.patch('/api/projects', update)
      .then(
        this.update()
      )
  }

  declineJoin =(props) =>{
    console.log(props)
    
    let update = {update:{
      $pull:{pending_members:props._id}
    }, projectId:this.state._id};

    axios.patch('/api/projects', update)
    .then(
      this.update()
    )
  }

  renderTechTags = () => {
    return this.state.tech_tags.map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  renderPRorIssue = type => {
    const list = this.state[type];
    return list.length === 0 ?
    `No ${type} for this repository, yet.` :
    list.map( item => (
      <Item.Group>
        <Divider/>
        <Item>
          <Image className='projectImage' shape='circular' size='mini' as='a' href={item.author.url} src={item.author.avatarUrl} />
          <Item.Content>
            <Item.Header as='a' href={item.url}>{item.title}</Item.Header>
            <Item.Meta>{item.state}</Item.Meta>
          </Item.Content>
        </Item>
      </Item.Group>
    ));
  }

  renderButtonText = () => {
    let buttonText = '';
    const priv = this.state.priviledge;
    if (priv === 'owner') {
      buttonText = 'Edit Project Details';
    } else if (priv === 'member') {
      buttonText = 'You are a member!';
    } else if (priv === 'pending') {
      buttonText = "Awaiting approval..."
    } else {
      buttonText = 'Request to Join!'
    }
    return buttonText;
  }

  panes = () => {
    const teamChat = { menuItem: 'Team Chat', render: () =>
      <Tab.Pane attached={false}>
        <Chat chat_type='private' cohort={this.props.match.params.cohort} user={this.state.userID} projectId={this.state._id}
        chats={this.state.chat.filter(chat => chat.chat_type === 'private')}  />
      </Tab.Pane> }
    const pubChat = { menuItem: 'Public Forum', render: () =>
      <Tab.Pane attached={false}>
        <Chat chat_type='public' cohort={this.props.match.params.cohort} user={this.state.userID} projectId={this.state._id}
        chats={this.state.chat.filter(chat => chat.chat_type === 'public')} />
      </Tab.Pane> }

      return this.state.priviledge === 'owner' || this.state.priviledge === 'member' ? [pubChat, teamChat] : [pubChat];
  }

  update = ()=>{
    console.log("updated");
    this.fetchProjectData();
  }

  render(props) {
    console.log("this is the state before the render:", this.state);
    return (
      <div className='projectBackground'>
        <Navbar currentPage='project' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
        <Segment textAlign='center' vertical basic className='projectBanner'>
          <Container textAlign='center' vertical>
            <Header as='h1' className='projectTitle'>
            {this.state.name}
            </Header>
            <br/><br/><br/>
            <p className='projectSummary'>{this.state.summary}</p>
          </Container>
        </Segment>

        <Container>
          <Grid columns={3} className='projectGrid'>
            <Grid.Row>

              <Grid.Column width={4}>
                <Segment className='pullRequest'>
                  <Header as='h3'>Pull Requests</Header>
                  {
                    this.state.repo_link === '' ?
                    'No Github Repository Connected.' :
                    this.renderPRorIssue('pulls')
                  }
                </Segment>

                <Segment className='pullRequest'>
                  <Header as='h3'>Issues</Header>
                  {
                    this.state.repo_link === '' ?
                    'No Github Repository Connected.' :
                    this.renderPRorIssue('issues')
                  }
                </Segment>
              </Grid.Column>

              <Grid.Column width={8}>
                <Segment>
                  <Label className='projectProgress' attached='top'>{this.state.status}</Label>
                  <Segment basic>
                    <Header as='h3'>Project Details
                      {this.state.repo_link !== '' ? <Icon link={this.state.repo_link} className='projectIcons' name='github' size='large'/> : ''}
                      {this.state.google_drive_link !== '' ? <Icon link={this.state.google_drive_link} className='projectIcons' name='google' size='large' color='red'/> : ''}
                      {this.state.trello_link !== '' ? <Icon link={this.state.trello_link} className='projectIcons' name='trello' size='large' color='blue' /> : ''}
                    </Header>
                    <p>{this.state.description}</p>
                    {this.renderTechTags()}<br/><br/>
                    <Grid divided='vertically'>
                      <Grid.Row columns={3}>
                        <Grid.Column>
                            <p className='projectStat'>Start Date</p>
                            <Header>{formatDate(this.state.start_date)}</Header>
                        </Grid.Column>
                        <Grid.Column>
                            <p className='projectStat'>Project Length</p>
                            <Header>{this.state.duration} weeks </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <p className='projectStat'>Team Size</p>
                            <Header>{this.state.members_wanted} members</Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    {
                          this.state.deploy_link !== '' ?
                              <Button fluid className='projectCheck' as='a' href={this.state.deploy_link} > View Live Demo </Button>
                          : ''
                        }
                  </Segment>
                  <Segment basic className='projectChat'>
                    <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()}/>
                  </Segment>
                </Segment>
              </Grid.Column>

              <Grid.Column width={4}>
                <Segment className='joinRequest'>
                  <Button fluid className='projectJoin' link={this.state.deploy_link}>
                    {this.renderButtonText()}
                  </Button>
                </Segment>

                <Card.Group>
                  {this.renderPendingMembers()}
                </Card.Group>

                <Segment className='projectSegment'>
                  <Header as='h3'>Team Members</Header>
                  <Divider/>
                  {this.renderTeamMembers()}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>


       </div>
    );
  }
}

export default Project
