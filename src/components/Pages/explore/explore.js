import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Menu, Button, Icon, Segment , Input, Dropdown, Feed, Card} from 'semantic-ui-react';
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
import projectData from '../../../utils/sampleData/sampleProjects.json';
import search from '../../Common/navbar';
import axios from 'axios';
import moment from 'moment';
import techSelection from '../../../utils/techTags.json';

const projectProgress = [
  {
    text: 'Proposed',
    value: 'Proposed',
  },
  {
    text: 'in Progress',
    value: 'in Progress',
  },
  {
    text: 'Completed',
    value: 'Completed',
  },

]

class Explore extends Component {

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
    statusFilter: "Proposed",
    techFilters: [],
    projects: [],
    activities: []
  };

  // On page load, get all projects and send to this.state.projects
  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
     axios.get('/api/projects').then((res) => {
      this.setState({ projects: res.data });
      console.log(res.data);
    }).catch(error => {
      console.log('Catching Error: ', error);
    });
    axios.get('/auth/checkLoggedIn').then((res) => {
      this.setState({ userID: res.data });
      console.log(res.data);
    }).catch(error => {
      console.log('Catching Error: ', error);
    });
    axios.get('/api/activityfeed').then((res) => {
      this.setState({ activities: res.data });
      console.log('activities data: ', res.data);
    }).catch(error => {
      console.log('Catching Error: ', error);
    });
    console.log(this.state);
  }

  handleStatusFilter = (e, {value}) => {
    this.setState({statusFilter:value})
  }

  handleTechFilter = (e, {value}) => {
    this.setState({techFilters:value})
  }

  compareArray = (searchArray, mainArray) =>{
    let status = true;
    searchArray.forEach(key=>{
      if(-1 === mainArray.indexOf(key)){
        status = false
      }
    }, this)
    return status;
  }

  // A helper method for rendering one Tile for each 1/3 project
  renderTiles = remainder => {
    let projectStatus = this.state.statusFilter;
    switch(this.state.statusFilter){
      case "Proposed": projectStatus = "proposal"
        break;
      case "in Progress": projectStatus = "in-progress"
        break;
      case "Completed": projectStatus = "completed"
        break;
      default: projectStatus = "proposal";
    }
    let colArr = this.state.projects.filter(project => {
      return ((project.status === projectStatus) &&(this.compareArray(this.state.techFilters, project.tech_tags)))
    }).filter((project, index) => {
      return index % 3 === remainder;
    });
    return colArr.map(project => (
      <Tile {...project} renderTechTags={this.renderTechTags}
      handleJoinButton={this.handleJoinButton} formatDate={this.formatDate}/>
    ));
  }

  renderTechTags = (tech_tags) => {
    return tech_tags.slice(0, 6).map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  handleJoinButton = () => {

  }

  renderActivityJoinCohort = () => {
    return this.state.activities.map(activity => (
      <Feed.Event>
        <Feed.Label image={activity.user_id.github.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            {activity.user_id.github.name} joined the cohort.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ));
  }

  renderActivityJoinProject = () => {
    return this.state.activities.map(activity => (
      <Feed.Event>
        <Feed.Label image={activity.user_id.github.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            {activity.user_id.github.name} joined {activity.project_id.name}.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ));
  }

  renderActivityCreateProject = () => {
    return this.state.activities.map(activity => (
      <Feed.Event>
        <Feed.Label image={activity.user_id.github.avatar_url} />
        <Feed.Content>
          <Feed.Summary>
            {activity.user_id.github.name} joined {activity.project_id.name}.
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    ));
  }

  // renderAllActivity = () => {
  //   return this.state.activities.map(activity => {
  //     switch (activityType) {
  //       case value1:
  //         //Statements executed when the result of expression matches value1
  //       break;
  //       case value2:
  //         //Statements executed when the result of expression matches value2
  //       break;
  //       case valueN:
  //         //Statements executed when the result of expression matches valueN
  //       break;
  //       default:
  //         //Statements executed when none of the values match the value of the expression
  //       break;
  //     }
  //
  //   })
  // }



  formatDate = date => moment(date).format('MM/DD/YYYY');

  render(props) {
    console.log("before render state", this.state)
    return (
      <div className='exploreBackground'>
        <Navbar currentPage='explore' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
        <div>
          <Segment basic className='exploreNavBuffer'></Segment>
          <Grid columns={4}>
            <Grid.Row>

              <Grid.Column width={1}>
              </Grid.Column>

              <Grid.Column width={3}>
                <Segment className='exploreactivityFeed'>
                  <Header as='h3'>Activity Feed</Header>
                  <Divider/>
                  <Feed>
                    {this.renderActivityJoinCohort()}
                  </Feed>
                </Segment>
              </Grid.Column>

              <Grid.Column width={11}>
                <Segment textAlign='center' vertical className='exploreBanner'>
                  <Container>
                    <Header className='exploreHeader'>
                      <span className='exploreProjectsSpan'>Explore Projects</span> {' '}
                      <Dropdown inline options={projectProgress} defaultValue={projectProgress[0].text} className='exploreDropdown' onChange={this.handleStatusFilter}/>
                    </Header>
                    <h1 className='searchHeader'>
                      <span className='searchBySpan'>Search by</span> {' '}
                      <Dropdown inline multiple search selection options={techSelection} placeholder='All Technologies' className='searchDropdown' onChange={this.handleTechFilter}/>
                    </h1>
                  </Container>
                </Segment>
                <br/><br/>
                <Grid stackable container columns={3}>
                  <Grid.Row>
                    <Grid.Column>
                      {this.renderTiles(0)}
                    </Grid.Column>
                    <Grid.Column>
                      {this.renderTiles(1)}
                    </Grid.Column>
                    <Grid.Column>
                      {this.renderTiles(2)}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>

              <Grid.Column width={1}>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Explore;
