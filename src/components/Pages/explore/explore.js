import React, { Component } from 'react';
import { Container, Divider, Header, Label, Grid } from 'semantic-ui-react';
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

  // A helper method for rendering one Tile for each 1/3 project
  renderFirstThirdTiles = () => {
    let newArray1 = [];
    this.state.projects.map((project, index) => {
      index % 3 === 0 ? newArray1.push(project) : console.log("Do Nothing")
    });
    console.log('newArray1', newArray1);
    return newArray1.map(project => (
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
        pending_members={project.pending_members}
        members={project.members}
        renderTechTags={this.renderTechTags}
        handleJoinButton={this.handleJoinButton}
      />
    ));
  }

  // A helper method for rendering one Tile for each 2/3 project
  renderSecondThirdTiles = () => {
    let newArray2 = [];
    this.state.projects.map((project, index) => {
      index % 3 === 1 ? newArray2.push(project) : console.log("Do Nothing")
    });
    console.log('newArray2', newArray2);
    return newArray2.map(project => (
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
        pending_members={project.pending_members}
        members={project.members}
        renderTechTags={this.renderTechTags}
        handleJoinButton={this.handleJoinButton}
      />
    ));
  }

  // A helper method for rendering one Tile for each 3/3 project
  renderThirdThirdTiles = () => {
    let newArray3 = [];
    this.state.projects.map((project, index) => {
      index % 3 === 2 ? newArray3.push(project) : console.log("Do Nothing")
    });
    console.log('newArray3', newArray3);
    return newArray3.map(project => (
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
        <Grid stackable centered container columns={3}>
          <Grid.Row>
            <Grid.Column>
              {this.renderFirstThirdTiles()}
            </Grid.Column>
            <Grid.Column>
              {this.renderSecondThirdTiles()}
            </Grid.Column>
            <Grid.Column>
              {this.renderThirdThirdTiles()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Explore;
