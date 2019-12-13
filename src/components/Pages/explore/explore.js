import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Segment , Dropdown, Feed} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
import axios from 'axios';
import techSelection from '../../../utils/techTags.json';


//Change to fileType for filtering pdf's videos and articles
const resourceType = [
  {
    text: 'pdf',
    value: 'pdf',
  },
  {
    text: 'article',
    value: 'article',
  },
  {
    text: 'video',
    value: 'video',
  },

]

class Explore extends Component {

  state = {
    dataLoaded: false,
    fileTypeFilter: "pdf",
    techFilters: [],
    userID: this.props.auth,
    projects: [],
    activities: [],
  }

  componentDidMount() {
    // console.log('State before fetch:', this.state);
    this.fetchProjectData()
    .then(() => this.fetchActivityData())
    .then(() => {
       this.setState({ dataLoaded: true })
       // console.log('State after fetch:',this.state);
    })
    .catch(error => console.log('Error during setup:', error))
 }

 componentDidUpdate() {

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
      return axios.get('/api/activityfeed/latest').then(res => {
        // console.log('Activity Data:',res.data);
        this.setState({ activities: res.data });
        return res.data
      }).catch(error => {
        console.log('Error while fetching data:', error);
        return error;
      });
    }

  //handleFileTypeFilter
  handlefileTypeFilter = (e, {value}) => {
    this.setState({fileTypeFilter: value})
  }

  handleTechFilters = (e, {value}) => {
    this.setState({techFilters: value})
  }

  compareArray = (searchArray, mainArray) =>{
    let fileType = true;
    searchArray.forEach(key=>{
      if(-1 === mainArray.indexOf(key)){
        fileType = false
      }
    }, this)
    return fileType;
  }

  // A helper method for rendering one Tile for each 1/3 project
  renderTiles = remainder => {
    let resourceFileType = this.state.fileTypeFilter;
    switch(this.state.fileTypeFilter){
      case "pdf": resourceFileType = "pdf"
        break;
      case "article": resourceFileType = "article"
        break;
      case "video": resourceFileType= "video"
        break;
      default: resourceFileType = "article";
    }
    let colArr = this.state.projects.filter(project => {
      return ((project.fileType === resourceFileType)  && (this.compareArray(this.state.techFilters, project.tech_tags,)))
    }).filter((project, index) => {
      return index % 1 === remainder;
    });
      return colArr.map(project => (
    <Tile 
      {...project}
      renderTechTags={this.renderTechTags}
      cohort={this.props.match.params.cohort}
      username={this.state.userID.user.github.login}
      />
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
      case 'added':
        text = `${activity.user_id.github.name} added ${activity.project_id.title}`
        break;
      case 'recommended':
        text = `${activity.user_id.github.name} changed status of ${activity.project_id.title} to 'recommended'.`
        break;
      case 'required':
        text = `${activity.user_id.github.name} changed status of ${activity.project_id.title} to 'REQUIRED'.`
        break;
      case 'member joined cohort':
        text = `${activity.user_id.github.name} joined the cohort.`
        break;
      case 'liked':
        text = `${activity.user_id.github.name} liked ${activity.project_id.name}.`
        break;
      case 'favorited':
        text = `${activity.user_id.github.name} favorited ${activity.project_id.name}.`
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


  render(props) {
    // console.log("before render state", this.state)
    return (

      <div className='exploreBackground'>
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
                        <span className='exploreProjectsSpan'>Discover Resources</span> {' '}
                        <Dropdown inline options={resourceType} defaultValue={resourceType[0].text} className='exploreDropdown' onChange={this.handlefileTypeFilter}/>
                      </Header>
                      <h1 className='searchHeader'>
                        <span className='searchBySpan'>Search by</span> {' '}
                        <Dropdown inline multiple search selection options={techSelection} placeholder='All Technologies' className='searchDropdown' onChange={this.handleTechFilters}/>
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
      </div>
    );
  }
}

export default Explore;
