import React, { Component } from "react";
import { Tab, Label, Container, Image, Header, Segment, Grid, Divider, Button, Item, Icon, Card } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import Chat from "../../Common/chat";
import MemberBlock from "./MemberBlock";
import { Link } from 'react-router-dom';
import './project.css';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

const formatDate = date => moment(date).format('MM/DD/YYYY');


class Project extends Component {
  constructor(props) {
    super(props)
    const socket = io();

    this.state = {
      socket,
      dataLoaded: false,
      priviledge: 'public',
      repo: false,
      issues: [],
      pulls: [],
      contributors: [],
      userID: this.props.auth
    };
  }

  componentDidMount() {
    // console.log('State before fetch:', this.state);
    this.fetchProjectData()
    .then(repoLink => {
      if (repoLink) {
        this.setState({repo: true})
        this.fetchGithubData(repoLink)
        return repoLink
      } else {
        this.setState({repo: false})
        return repoLink
      }
    })
    .then(() => {
        this.setPriveledge();
        this.state.socket.emit('join', this.state._id);
        this.state.socket.on('refreshMsg', data => {
          this.fetchProjectData();
        })
        this.setState({dataLoaded: true});
        //console.log('State after fetch:',this.state);
    })
    .catch(error => console.log('Error on setup:', error));
  }

  componentWillUnmount() {
    this.state.socket.emit('leave', this.state._id)
  }

  fetchProjectData = () => {
    return axios.get(`/api/projectData${this.props.location.pathname}`).then(res => {
      // console.log('Project data:',res.data);
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

  setPriveledge = () => {
      const curUser = this.state.userID.user.github.login;
      if (this.state.owner_id.github.login === curUser) {
        this.setState({priviledge: 'owner'})
      } else if (this.state.members.find(m => m.github.login === curUser)) {
        this.setState({priviledge: 'member'})
      } else if (this.state.pending_members.find(m => m.github.login === curUser)) {
        this.setState({priviledge: 'pending'})
      }
  }

  renderTeamMembers = () => {
    return this.state.members.map(member => {
      if (this.state.repo) {
        member.contributions = this.state.contributors.find(c => c.name === member.github.login )
        if (!member.contributions) {
            member.contributions = {
                commits: 0,
                additions: 0,
                deletions: 0
            }
        }
      } else {
        member.contributions = {
            commits: 0,
            additions: 0,
            deletions: 0
        }
      }

      return (
        <MemberBlock {...member} priviledge={this.state.priviledge}
        projectId={this.state._id} updateFunction={this.fetchProjectData} />
      )
    })
  }

  renderPendingMembers = () => {
    const DecisionButtons = (props) =>
    (<Card.Content extra>
      <div className='ui two buttons'>
        <Button fluid className='projectClose' onClick= {()=> this.manageJoin('declined', props)}>Decline </Button>
        <Button fluid className='projectCheck' onClick= {()=> this.manageJoin('approved', props)}>Approve </Button>
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

  manageJoin = (status, props) => {
    const update  = {
      update:{
          $pull:{pending_members:props._id}
      }, 
      projectId:this.state._id,
      memberId:props._id,
      joinerStatus:status
    }

    if (status === 'approved') {
      update.update.$push = {members:props._id} 
    }

    axios.patch('/api/projects', update)
    .then(this.fetchProjectData())
  }

  renderTechTags = () => {
    return this.state.tech_tags.map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  renderPRorIssue = type => {
    if (!this.state.repo) {
      return `No ${type} for this repository, yet.` 
    } else {
      this.state[type].map( item => (
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
  }

  getParams = () => [this.props.match.params.cohort, this.props.match.params.username, this.props.match.params.project];

  renderButton = () => {
    const priv = this.state.priviledge;
    if (priv === 'owner') {
      const [cohort, username, project] = this.getParams();
      return <Button fluid className='projectJoin' as={Link} to={`/${cohort}/${username}/edit/${project}`}
        content='Edit Project Details' />
    } else if (priv === 'member') {
      return <Button fluid className='projectJoin' content='You are a member!' />
    } else if (priv === 'pending') {
      return <Button fluid className='projectJoin' content='Awaiting approval...' />
    } else {
      return <Button fluid className='projectJoin' onClick={this.handleButtonClick} content='Request to Join!' />
    }
  }

  handleButtonClick = () => {
    axios.patch('/api/projects', {projectId: this.state._id, update: {$push: {pending_members:this.state.userID.user._id}}, memberId:this.state.userID.user._id, joinerStatus:"joined"})
    .then(this.setState({priviledge: 'pending'}))
    .then(this.fetchProjectData())
    .catch(err => console.log('err on request to join:', err))
  }

  panes = () => {
    const teamChat = { menuItem: 'Team Chat', render: () =>
      <Tab.Pane attached={false}>
        <Chat chat_type='private' cohort={this.props.match.params.cohort} userID={this.state.userID} projectId={this.state._id}
        chats={this.state.chat.filter(chat => chat.chat_type === 'private')}  />
      </Tab.Pane> }
    const pubChat = { menuItem: 'Public Forum', render: () =>
      <Tab.Pane attached={false}>
        <Chat chat_type='public' cohort={this.props.match.params.cohort} userID={this.state.userID} projectId={this.state._id}
        chats={this.state.chat.filter(chat => chat.chat_type === 'public')} />
      </Tab.Pane> }

      return this.state.priviledge === 'owner' || this.state.priviledge === 'member' ? [pubChat, teamChat] : [pubChat];
  }

  // renderDevIcons = () => {
  //   switch (this.state.primary_language) {
  //     case 'javascript':
  //       return (
  //         <i class="devicon-javascript-plain colored"></i>
  //       )
  //     break;
  //     case 'python':
  //       return (
  //         <i class="devicon-python-plain colored"></i>
  //       )
  //     break;
  //     case 'c#':
  //       return (
  //         <i class="devicon-csharp-plain colored"></i>
  //       )
  //     break;
  //     case 'c++':
  //       return (
  //         <i class="devicon-cplusplus-plain colored"></i>
  //       )
  //     break;
  //     case 'php':
  //       return (
  //         <i class="devicon-php-plain colored"></i>
  //       )
  //     break;
  //     case 'go':
  //       return (
  //         <i class="devicon-go-plain colored"></i>
  //       )
  //     break;
  //     case 'swift':
  //       return (
  //         <i class="devicon-swift-plain colored"></i>
  //       )
  //     break;
  //     case 'java':
  //       return (
  //         <i class="devicon-java-plain colored"></i>
  //       )
  //     break;
  //     case 'ruby':
  //       return (
  //         <i class="devicon-ruby-plain colored"></i>
  //       )
  //     break;
  //     case 'html+css':
  //       return (
  //         <i class="devicon-html5-plain colored"></i>
  //       )
  //     break;
  //     default:
  //       // Do nothing
  //   }
  // }
  render(props) {
    // console.log("this is the state before the render:", this.state);
    return (
      <div className='projectBackground'>
        {this.state.dataLoaded ?
        <div>
          <Navbar currentPage='project' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
          <Segment textAlign='center' vertical basic className='projectBanner'>
            <Container textAlign='center' vertical>
              {/* {this.renderDevIcons} */}
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
                      this.state.repo ?
                      'No Github Repository Connected.' :
                      this.renderPRorIssue('pulls')
                    }
                  </Segment>

                  <Segment className='pullRequest'>
                    <Header as='h3'>Issues</Header>
                    {
                      this.state.repo ?
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
                    {this.state._id !== '' ? 
                    <Segment basic className='projectChat'>
                      <Tab menu={{ secondary: true, pointing: true }} panes={this.panes()}/>
                    </Segment> : ''}
                  </Segment>
                </Grid.Column>

                <Grid.Column width={4}>
                  <Segment className='joinRequest'>
                    {this.renderButton()}
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
        : '' }
       </div>
    );
  }
}

export default Project
