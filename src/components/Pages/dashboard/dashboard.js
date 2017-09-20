import React, { Component } from "react";
import { Grid, Divider, Header, Label } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import Tile from '../../Common/projectTiles';
import Navbar from "../../Common/navbar";
import projectData from '../../../utils/sampleData/sampleProjects.json';

class Dashboard extends Component {

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

  // // A helper method for rendering one Tile for each 2/3 project
  // renderSecondThirdTiles = () => {
  //   let centerColArr = this.state.projects.filter((project) => {
  //     return project.status !== 'deleted';
  //   }).filter((project, index) => {
  //     return index % 3 === 1;
  //   });
  //   console.log('centerColArr', centerColArr);
  //   return centerColArr.map(project => (
  //     <Tile
  //       title={project.name}
  //       summary={project.summary}
  //       description={project.description}
  //       tech_tags={project.tech_tags}
  //       start_date={project.start_date}
  //       duration={project.duration}
  //       members_wanted={project.members_wanted}
  //       google_drive_link={project.google_drive_link}
  //       trello_link={project.trello_link}
  //       repo_link={project.repo_link}
  //       deploy_link={project.deploy_link}
  //       status={project.status}
  //       pending_members={project.pending_members}
  //       members={project.members}
  //       renderTechTags={this.renderTechTags}
  //       handleJoinButton={this.handleJoinButton}
  //     />
  //   ));
  // }
  //
  // // A helper method for rendering one Tile for each 3/3 project
  // renderThirdThirdTiles = () => {
  //   let rightColArr = this.state.projects.filter((project) => {
  //     return project.status !== 'deleted';
  //   }).filter((project, index) => {
  //     return index % 3 === 2;
  //   });
  //   console.log('rightColArr', rightColArr);
  //   return rightColArr.map(project => (
  //     <Tile
  //       title={project.name}
  //       summary={project.summary}
  //       description={project.description}
  //       tech_tags={project.tech_tags}
  //       start_date={project.start_date}
  //       duration={project.duration}
  //       members_wanted={project.members_wanted}
  //       google_drive_link={project.google_drive_link}
  //       trello_link={project.trello_link}
  //       repo_link={project.repo_link}
  //       deploy_link={project.deploy_link}
  //       status={project.status}
  //       pending_members={project.pending_members}
  //       members={project.members}
  //       renderTechTags={this.renderTechTags}
  //       handleJoinButton={this.handleJoinButton}
  //     />
  //   ));
  // }

  renderTechTags = (tech_tags) => {
    return tech_tags.map(tech_tag => (
      <Label className='tileTags'>
        {tech_tag}
      </Label>
    ));
  }

  render() {
    return (
      <div>
        <Navbar currentPage='dashboard' />
        <Divider/>
        <Header as='h4'>Active Projects</Header>
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
        <Divider/>
        <Header as='h4'>Past Projects</Header>
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

export default Dashboard
