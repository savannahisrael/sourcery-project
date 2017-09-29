import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Menu, Button, Icon, Segment , Input, Dropdown} from 'semantic-ui-react';
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
    userID: {},
    statusFilter: "",
    techFilters: [],
    projects: []
  };

  // On page load, get all projects and send to this.state.projects
  // Also, get info on the user and save to this.state.userID
  componentDidMount() {
    axios.get('../api/projects').then((res) => {
      this.setState({ projects: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ', error);
    });
    axios.get('../auth/checkLoggedIn').then((res) => {
      this.setState({ userID: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ', error);
    });
  }

  handleStatusFilter = (event) => {
    // this.setState({ statusFilter: event.target.value });
    // console.log(this.state.statusFilter);
  }

  handleTechFilter = (event) => {
    // this.setState({ techFilters: event.target.value });
    // console.log(this.state.techFilters);
  }

  // A helper method for rendering one Tile for each 1/3 project
  renderTiles = (remainder) => {
    let colArr = this.state.projects.filter((project) => {
      return project.status !== 'deleted';
    }).filter((project, index) => {
      return index % 3 === remainder;
    });
    return colArr.map(project => (
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

  renderTechTags = (tech_tags) => {
    return tech_tags.slice(0, 6).map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  handleJoinButton = () => {

  }

  formatDate = (date) => {
    return (
      moment(date).format('MM/DD/YYYY')
    )
  }

  render() {
    return (
      <div>
        <Navbar currentPage='explore' />
        <div className='exploreBackground'>
        <Segment textAlign='center' vertical className='exploreBanner'>
          <Container>
            <Header className='exploreHeader'>
              <span className='exploreProjectsSpan'>Explore Projects</span> {' '}
              <Dropdown inline options={projectProgress} defaultValue={projectProgress[0].text} className='exploreDropdown' onChange={this.handleStatusFilter()}/>
            </Header>
            <h1 className='searchHeader'>
              <span className='searchBySpan'>Search by</span> {' '}
              <Dropdown inline multiple search selection options={techSelection} placeholder='All Technologies' className='searchDropdown' onChange={this.handleTechFilter()}/>
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
        </div>
      </div>
    );
  }
}

export default Explore;

// <Grid.Column width={2}>
//   <Card centered>
//     <Card.Content>
//       <Card.Header>
//         Recent Activity
//       </Card.Header>
//     </Card.Content>
//     <Card.Content>
//       <Feed>
//         <Feed.Event>
//           <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
//           <Feed.Content>
//             <Feed.Date content='1 day ago' />
//             <Feed.Summary>
//               You added <a>Jenny Hess</a> to your <a>coworker</a> group.
//             </Feed.Summary>
//           </Feed.Content>
//         </Feed.Event>

//         <Feed.Event>
//           <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
//           <Feed.Content>
//             <Feed.Date content='3 days ago' />
//             <Feed.Summary>
//               You added <a>Molly Malone</a> as a friend.
//             </Feed.Summary>
//           </Feed.Content>
//         </Feed.Event>

//         <Feed.Event>
//           <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
//           <Feed.Content>
//             <Feed.Date content='4 days ago' />
//             <Feed.Summary>
//               You added <a>Elliot Baker</a> to your <a>musicians</a> group.
//             </Feed.Summary>
//           </Feed.Content>
//         </Feed.Event>
//       </Feed>
//     </Card.Content>
//   </Card>
// </Grid.Column>