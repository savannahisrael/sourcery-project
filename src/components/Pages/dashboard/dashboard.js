import React, { Component } from "react";
import { Grid, Divider, Header, Label, Container, Image, Segment, Tab, Card, Feed } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import Tile from '../../Common/projectTiles';
import Navbar from "../../Common/navbar";
import './dashboard.css';
import axios from 'axios';
import moment from 'moment';

class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
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
      activeProjects: [
        {
          tech_tags: [],
          members_wanted: 0,
          cohort_id: {
            code: ''
          },
          owner_id: {
            github: {
              login: '',
              avatar_url: ''
            }
          },
          status: '',
          members: [
            {
              github: {
                login: ''
              }
            }
          ]
        }
      ],
      pastProjects: [
        {
          tech_tags: [],
          members_wanted: 0,
          cohort_id: {
            code: ''
          },
          owner_id: {
            github: {
              login: '',
              avatar_url: ''
            }
          },
          status: '',
          members: [
            {
              github: {
                login: ''
              }
            }
          ]
        }
      ]
    };
  }

  componentDidMount() {
    this.checkLoggedIn()
    .then(user => this.fetchProjects())
  }

  checkLoggedIn = () => {
    return axios.get('/auth/checkLoggedIn').then(res => {
      this.setState({ userID: res.data });

      // ------- Manual Auth Override
      // this.setState({
      //   userID: {
      //     login: true,
      //     user: {
      //       github: {
      //         login: 'aarongaither',
      //         avatar_url: 'https://avatars1.githubusercontent.com/u/16161706?v=4&s=400',
      //         name: 'Aaron Gaither'
      //       }
      //     }
      //   }
      // })
      return res.data;
    }).catch(error => {
      console.log('Catching Error while authing user: ', error);
    });
  }

  fetchProjects = () => {
    return axios.get('/api/projects').then(res => {
      const userProjects = res.data.filter(p => {
        const curUser = this.state.userID.user.github.login;
        return p.members.find(m => m.github.login === curUser) || p.owner_id.github.login === curUser
      })
      this.setState({
        pastProjects: userProjects.filter(p => p.status === 'completed'),
        activeProjects: userProjects.filter(p => p.status === 'proposal' || p.status === 'in-progress')
      });
      return userProjects;
    }).catch(error => {
      console.log('Catching Error: ', error);
    });
  }

  // Designed for generating 3 columns in semantic-ui grid format. Pass remainder value of 0, 1, and 2.
  renderTiles = (remainder, type) => {
    return this.state[type]
    .filter((project, index) => index % 3 === remainder)
    .map(project => <Tile {...project} renderTechTags={this.renderTechTags} formatDate={this.formatDate} />);
  }

  renderTechTags = tech_tags => tech_tags.map(tech_tag => (
    <Label className='tileTags'>
      {tech_tag}
    </Label>
  ));

  formatDate = date => moment(date).format('MM/DD/YYYY');

  renderPanes = () => {
    return (
      [{ menuItem: 'Active Projects', render: () =>
          <Tab.Pane className='tabPane' attached={false}>
            {this.state.activeProjects.length > 0 ?
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  {this.renderTiles(0, 'activeProjects')}
                </Grid.Column>
                <Grid.Column>
                  {this.renderTiles(1, 'activeProjects')}
                </Grid.Column>
                <Grid.Column>
                  {this.renderTiles(2, 'activeProjects')}
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
                {this.renderTiles(0, 'pastProjects')}
              </Grid.Column>
              <Grid.Column>
                {this.renderTiles(1, 'pastProjects')}
              </Grid.Column>
              <Grid.Column>
                {this.renderTiles(2, 'pastProjects')}
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
        <Navbar currentPage='dashboard' cohort={this.props.match.params.cohort} username={this.props.match.params.username}/>
        {/* <p>Cohort: {this.props.match.params.cohort}</p>
        <p>Username: {this.props.match.params.username}</p> */}
        <Segment textAlign='center' vertical className='dashboardBanner'>
          <Container text>
          <Header as='h1' className='dashboardTitle'>
            Dashboard
          </Header><br/><br/><br/>
          </Container>
        </Segment>
        <br/><br/>
        <Grid columns={3}>
          <Grid.Row >
            <Grid.Column width={1}>
              {/* this column is just here for padding */}
            </Grid.Column>
            <Grid.Column width={14}>
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
