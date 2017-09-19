import React, { Component } from 'react';
import { Container, Divider, Header, Label } from 'semantic-ui-react';
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import Tile from '../../Common/projectTiles';
import Navbar from '../../Common/navbar';
import './explore.css';
import projectData from '../../../utils/sampleData/sampleProjects.json';

class Explore extends Component {

  state = {
    filters: [],
    projects: projectData,
  };

  // A helper method for rendering one Tile for each project
  renderTiles = () => {
    return this.state.projects.map(project => (
      <Tile
        // _id={project._id}
        // key={project._id}
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
        <Divider/>
        <Header as='h4'>All Projects</Header>
        <Divider/>
        {this.renderTiles()}
      </div>
    );
  }
}

export default Explore;
