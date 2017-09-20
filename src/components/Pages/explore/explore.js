import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid, Menu, Button, Icon, Segment , Input} from 'semantic-ui-react';
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
import projectData from '../../../utils/sampleData/sampleProjects.json';
import search from '../../Common/navbar';

class Explore extends Component {

  state = {
    filters: [],
    projects: projectData,
  };

  // A helper method for rendering one Tile for each 1/3 project
  renderTiles = (remainder) => {
    let colArr = this.state.projects.filter((project) => {
      return project.status !== 'deleted';
    }).filter((project, index) => {
      return index % 3 === remainder;
    });
    console.log('colArr', colArr);
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
      />
    ));
  }

  renderTechTags = (tech_tags) => {
    return tech_tags.map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  handleJoinButton = () => {

  }

  render() {
    return (
      <div>
        <Navbar currentPage='explore' />
        {/* <Divider/> */}
        <Segment inverted textAlign='center' vertical className='exploreBanner'>
            <Container text>
              <Header inverted as='h1' className='exploreTitle'>
                Explore Projects  
              </Header>
              <Header as='h2' inverted className='exploreSubtitle'>
               Solve interesting problems.
              </Header>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' className='exploreSearch' />
              </Menu.Item>            
              </Container>
          </Segment>


        <Header as='h4'>All Projects</Header>
        <Divider/>
        <Grid stackable centered container columns={3}>
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
    );
  }
}

export default Explore;
