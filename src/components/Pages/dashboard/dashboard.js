import React, { Component } from "react";
import { Grid, Divider, Header, Label, Container, Image, Segment, Tab, Card, Feed } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import Tile from '../../Common/projectTiles';
import Navbar from "../../Common/navbar";
import './dashboard.css';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {

  state = {
    userID: {},
    activeProjects: [],
    pastProjects: []
  };

  // On page load, get all projects and send to this.state.projects
  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
    this.checkLoggedIn()
    .then(user => {
      this.fetchProjects();
    })
  }

  checkLoggedIn = () => {
    return axios.get('/auth/checkLoggedIn').then(res => {
      this.setState({ userID: res.data });

      // ------- Manual Auth Override
      this.setState({userID: {
        login: true,
        user: {
          github: {
            login: 'aarongaither',
            avatar_url: 'https://avatars1.githubusercontent.com/u/16161706?v=4&s=400',
            name: 'Aaron Gaither'
          }
        }
      }})
      console.log('User:',this.state.userID);
      return res.data;
    }).catch(error => {
      console.log('Catching Error while authing user: ', error);
    });
  }

  fetchProjects = () => {
    axios.get('/api/projects').then(res => {
      const userProjects = res.data.filter(p => {
        const curUser = this.state.userID.user.github.login;
        return p.members.find(m => m.github.login === curUser) || p.owner_id.github.login === curUser
      })
      this.setState({ 
        pastProjects: userProjects.filter(p => p.status === 'completed'),
        activeProjects: userProjects.filter(p => p.status === 'proposal' || p.status === 'in-progress')
      });
      console.log('Filtered:', this.state.pastProjects, this.state.activeProjects);
    }).catch(error => {
      console.log('Catching Error: ', error);
    });
  }

  // A helper method for rendering Tiles for projects that have a status of 'proposal' or 'in-progress'.
  // Designed for generating 3 columns in semantic-ui grid format. Pass remainder value of 0, 1, and 2.
  renderActiveTiles = remainder => {
    return this.state.activeProjects
    .filter((project, index) => index % 3 === remainder)
    .map(project => (
      <Tile
        title={project.name}
        summary={project.summary}
        description={project.description}
        tech_tags={project.tech_tags}
        start_date={project.start_date}
        duration={project.duration}
        members_wanted={project.members_wanted}
        google_drive_link={project.google_drive_link}
        trello_link={project.trello_link}
        repo_link={project.repo_link}
        deploy_link={project.deploy_link}
        status={project.status}
        pending_members={project.pending_members}
        members={project.members}
        renderTechTags={this.renderTechTags}
        handleJoinButton={this.handleJoinButton}
        formatDate={this.formatDate}
      />
    ));
  }

  // A helper method for rendering Tiles for projects that have a status of 'completed'.
  // Designed for generating 3 columns in semantic-ui grid format. Pass remainder value of 0, 1, and 2.
  renderPastTiles = remainder => {
    return this.state.pastProjects
    .filter((project, index) => index % 3 === remainder)
    .map(project => (
      <Tile
        title={project.name}
        summary={project.summary}
        description={project.description}
        tech_tags={project.tech_tags}
        start_date={project.start_date}
        duration={project.duration}
        members_wanted={project.members_wanted}
        google_drive_link={project.google_drive_link}
        trello_link={project.trello_link}
        repo_link={project.repo_link}
        deploy_link={project.deploy_link}
        status={project.status}
        pending_members={project.pending_members}
        members={project.members}
        renderTechTags={this.renderTechTags}
        handleJoinButton={this.handleJoinButton}
        formatDate={this.formatDate}
      />
    ));
  }

  renderTechTags = tech_tags => {
    return tech_tags.map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  formatDate = (date) => {
    return (
      moment(date).format('MM/DD/YYYY')
    )
  }

  renderPanes = () => {
    return (
      [{ menuItem: 'Active Projects', render: () => 
          <Tab.Pane className='tabPane' attached={false}>
            {this.state.activeProjects.length > 0 ?
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  {this.renderActiveTiles(0)}
                </Grid.Column>
                <Grid.Column>
                  {this.renderActiveTiles(1)}
                </Grid.Column>
                <Grid.Column>
                  {this.renderActiveTiles(2)}
                </Grid.Column>
              </Grid.Row>
            </Grid> :
            'No Active Projects To Display.'}
          </Tab.Pane>

      },
      { menuItem: 'Past Projects', render: () =>      
        <Tab.Pane className='tabPane' attached={false}>
          {this.state.pastProjects.length > 0 ?
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                {this.renderPastTiles(0)}
              </Grid.Column>
              <Grid.Column>
                {this.renderPastTiles(1)}
              </Grid.Column>
              <Grid.Column>
                {this.renderPastTiles(2)}
              </Grid.Column>
            </Grid.Row>
          </Grid> :
          'No Completed Projects To Display.'}
        </Tab.Pane>
      }
    ])
  }

  render(props) {
    return (
      <div>
        <Navbar currentPage='dashboard' />
        {/* <p>Cohort: {this.props.match.params.cohort}</p>
        <p>Username: {this.props.match.params.username}</p> */}
        <Segment textAlign='center' vertical className='dashboardBanner'>
          <Container text>
          <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' size='tiny' shape='circular' centered />
          <Header as='h1' className='dashboardTitle'>
            Dashboard
          </Header><br/><br/><br/>
          </Container>
        </Segment>
        <br/><br/>

        <Grid columns={4}>
          <Grid.Row >

            <Grid.Column width={1}>
              {/* this column is just here for padding */}
            </Grid.Column>

            <Grid.Column width={2}>
              <Card centered>
                <Card.Content>
                  <Card.Header>
                    Recent Activity
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
                      <Feed.Content>
                        <Feed.Date content='1 day ago' />
                        <Feed.Summary>
                          You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
                      <Feed.Content>
                        <Feed.Date content='3 days ago' />
                        <Feed.Summary>
                          You added <a>Molly Malone</a> as a friend.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>

                    <Feed.Event>
                      <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
                      <Feed.Content>
                        <Feed.Date content='4 days ago' />
                        <Feed.Summary>
                          You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column width={1}>
              {/* this column is just here for padding */}
            </Grid.Column>

            <Grid.Column width={11}>
              <Tab className='tabMenu' menu={{ secondary: true, pointing: true }} panes={this.renderPanes()}/>
            </Grid.Column>

            <Grid.Column width={1}>
              {/* this column is just here for padding */}
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard
