import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Segment , Dropdown, Feed} from 'semantic-ui-react';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
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
    dataLoaded: false,
    statusFilter: "Proposed",
    techFilters: [],
    userID: this.props.auth
  }

  componentDidMount() {
    // console.log('State before fetch:', this.state);
     this.fetchProjectData()
     .then(() => this.fetchActivityData())
     .then(() => {
        this.setState({dataLoaded: true})
        // console.log('State after fetch:',this.state);
     })
     .catch(error => console.log('Error during setup:', error))
  }

  fetchProjectData = () => {
    return axios.get('/api/projects').then(res => {
      // console.log('Project data:',res.data);
      this.setState({ projects: res.data });
      return res.data
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
  }

  fetchActivityData = () => {
    return axios.get('/api/activityfeed').then(res => {
      // console.log('Activity Data:',res.data);
      this.setState({ activities: res.data });
      return res.data
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
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
      formatDate={this.formatDate}/>
    ));
  }

  renderTechTags = (tech_tags) => {
    return tech_tags.slice(0, 6).map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  renderActivityText = activity => {
    let text = '';
    switch (activity.event) {
      case 'proposal':
        text = `${activity.user_id.github.name} created ${activity.project_id.name}`
        break;
      case 'in-progress':
        text = `${activity.user_id.github.name} changed status of ${activity.project_id.name} to 'in-progress'.`
        break;
      case 'completed':
        text = `${activity.user_id.github.name} changed status of ${activity.project_id.name} to 'completed'.`
        break;
      case 'member joined cohort':
        text = `${activity.user_id.github.name} joined the cohort.`
        break;
      case 'member joined project':
        text = `${activity.user_id.github.name} joined ${activity.project_id.name}.`
        break;
      default:
        // Do nothing
    }
    return text;
  }

  renderActivities = () => {
    return this.state.activities.map(activity => {
      return (
        <Feed.Event>
          <Feed.Label className='activityFeedImage' image={activity.user_id.github.avatar_url} />
          <Feed.Content>
            <Feed.Summary>
              {this.renderActivityText(activity)}
            </Feed.Summary>
            <Divider/>
          </Feed.Content>
        </Feed.Event>
      )
    })
  }

  formatDate = date => moment(date).format('MM/DD/YYYY');

  render(props) {
    // console.log("before render state", this.state)
    return (

      <div className='exploreBackground'>
        { this.state.dataLoaded ?
        <div>
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
                      {this.renderActivities()}
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
        : ''
        }
      </div>
    );
  }
}

export default Explore;
