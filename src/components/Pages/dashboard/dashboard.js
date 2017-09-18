import React, { Component } from "react";
import { Grid, Divider, Header } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import Tile from '../../Common/projectTiles';
import Navbar from "../../Common/navbar";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Navbar currentPage='dashboard' />
        <Divider/>
        <Header as='h4'>Active Projects</Header>
        <Divider/>
        <Grid stackable centered container columns={3}>
          <Grid.Column>
            <Tile/>
          </Grid.Column>
          <Grid.Column>
            <Tile/>
          </Grid.Column>
        </Grid>
        <Divider/>
        <Header as='h4'>Past Projects</Header>
        <Divider/>
        <Grid stackable centered container columns={3}>
          <Grid.Column>
            <Tile/>
          </Grid.Column>
          <Grid.Column>
            <Tile/>
          </Grid.Column>
          <Grid.Column>
            <Tile/>
          </Grid.Column>
        </Grid>
        <Divider/>
        <Header as='h4'>Create Project</Header>
        <Divider/>
        <CreateProjectForm/>
      </div>
    );
  }
}

export default Dashboard
