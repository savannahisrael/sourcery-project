import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Segment , Dropdown, Feed} from 'semantic-ui-react';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
import axios from 'axios';
import moment from 'moment';
import techSelection from '../../../utils/techTags.json';

const resourceProgress = [
  {
    text: 'Recommended',
    value: 'Recommended',
  },
  {
    text: 'Required',
    value: 'Required',
  },
  {
    text: 'Active',
    value: 'Active',
  },

]

class ExploreResource extends Component {

  state = {
    dataLoaded: false,
    statusFilter: "Recommended",
    techFilters: [],
    userID: this.props.auth
  }

  componentDidMount() {
    // console.log('State before fetch:', this.state);
     this.fetchResourceData()
     .then(() => this.fetchActivityData())
     .then(() => {
        this.setState({dataLoaded: true})
        // console.log('State after fetch:',this.state);
     })
     .catch(error => console.log('Error during setup:', error))
  }

  fetchResourceData = () => {
    return axios.get('/api/resources').then(res => {
      // console.log('Project data:',res.data);
      this.setState({ resources: res.data });
      return res.data
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
  }

  fetchActivityData = () => {
    return axios.get('/api/activityfeed/latest').then(res => {
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
    let resourceStatus = this.state.statusFilter;
    switch(this.state.statusFilter){
      case "Recommended": resourceStatus = "recommended"
        break;
      case "Required": projectStatus = "required"
        break;
      case "Active": projectStatus = "active"
        break;
      default: projectStatus = "recommended";
    }
    let colArr = this.state.resources.filter(resource => {
      return ((resource.status === resourceStatus) &&(this.compareArray(this.state.techFilters, project.tech_tags)))
    }).filter((project, index) => {
      return index % 3 === remainder;
    });
    return colArr.map(resource => (
      <Tile {...resource} renderTechTags={this.renderTechTags}
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
      case 'recommended':
        text = `${activity.user_id.github.name} recommended ${activity.resource_id.name}`
        break;
      case 'required':
        text = `${activity.user_id.github.name} changed status of ${activity.resource_id.name} to 'required'.`
        break;
      case 'active':
        text = `${activity.user_id.github.name} changed status of ${activity.resource_id.name} to 'completed'.`
        break;
      case 'member joined cohort':
        text = `${activity.user_id.github.name} joined the cohort.`
        break;
      case 'member joined project':
        text = `${activity.user_id.github.name} joined ${activity.project_id.name}.`
        break;
      case 'approved to join the project':
        text = `${activity.user_id.github.name} was appoved to join ${activity.project_id.name}.`
        break;
      case 'disapproved to join the project':
        text = `${activity.user_id.github.name} was not allowed to join ${activity.project_id.name}.`
        break;
      case 'was ejected from the project':
        text = `${activity.user_id.github.name} was ejected from ${activity.project_id.name}.`
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
          <Navbar currentPage='exploreResources' cohort={this.props.match.params.cohort} username={this.state.userID.user.github.login} avatar={this.state.userID.user.github.avatar_url}/>
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
                        <span className='exploreProjectsSpan'>Explore Resources</span> {' '}
                        <Dropdown inline options={resourceProgress} defaultValue={projectProgress[0].text} className='exploreDropdown' onChange={this.handleStatusFilter}/>
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
                        {this.renderResourceTiles(0)}
                      </Grid.Column>
                      <Grid.Column>
                        {this.renderResourceTiles(1)}
                      </Grid.Column>
                      <Grid.Column>
                        {this.renderResourceTiles(2)}
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

export default ExploreResource;
