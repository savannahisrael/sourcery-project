import React, { Component } from "react";
import { Grid, Divider, Header, Label, Container, Image, Segment, Tab, Card, Feed } from 'semantic-ui-react';
import CreateProjectForm from '../createProject';
import Tile from '../../Common/projectTiles';
import Navbar from "../../Common/navbar";
import projectData from '../../../utils/sampleData/sampleProjects.json';
import './dashboard.css';

const panes = [
  { menuItem: 'Active Projects', render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Projects in Progress', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
  { menuItem: 'Complete Projects', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
]


class Dashboard extends Component {

  state = {
    filters: [],
    projects: projectData,
  };

  // A helper method for rendering Tiles for projects that have a status of 'proposal' or 'in-progress'.
  // Designed for generating 3 columns in semantic-ui grid format. Pass remainder value of 0, 1, and 2.
  renderActiveTiles = (remainder) => {
    let colArr = this.state.projects.filter((project) => {
      return project.status === 'proposal' || project.status === 'in-progress';
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

  // A helper method for rendering Tiles for projects that have a status of 'completed'.
  // Designed for generating 3 columns in semantic-ui grid format. Pass remainder value of 0, 1, and 2.
  renderPastTiles = (remainder) => {
    let colArr = this.state.projects.filter((project) => {
      return project.status === 'completed';
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
  
  render(props) {
    return (
      <div>
        <Navbar currentPage='dashboard' />
        {/* <p>Cohort: {this.props.match.params.cohort}</p>
        <p>Username: {this.props.match.params.username}</p> */}
        <Segment textAlign='center' vertical className='dashboardBanner'>
          <Container text>
          <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' size='tiny' shape='circular' centered />
          <Header as='h1' className='dashboardTitle'>
            Dashboard  
          </Header><br/><br/><br/>
          </Container>
        </Segment>
        <Container text className='dashboardTab'>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
        </Container>
        <Card>
    <Card.Content>
      <Card.Header>
        Recent Activity
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <Feed>
        <Feed.Event>
          <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
          <Feed.Content>
            <Feed.Date content='1 day ago' />
            <Feed.Summary>
              You added <a>Jenny Hess</a> to your <a>coworker</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
          <Feed.Content>
            <Feed.Date content='3 days ago' />
            <Feed.Summary>
              You added <a>Molly Malone</a> as a friend.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>

        <Feed.Event>
          <Feed.Label image='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' />
          <Feed.Content>
            <Feed.Date content='4 days ago' />
            <Feed.Summary>
              You added <a>Elliot Baker</a> to your <a>musicians</a> group.
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
        <Header as='h4'>Active Projects</Header>
        <Divider/>
        <Grid stackable centered container columns={3}>
          <Grid.Row>
            <Grid.Column>
              {this.renderActiveTiles(0)}
            </Grid.Column>
            <Grid.Column>
              {this.renderActiveTiles(1)}
            </Grid.Column>
            <Grid.Column>
              {this.renderActiveTiles(2)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider/>
        <Header as='h4'>Past Projects</Header>
        <Divider/>
        <Grid stackable centered container columns={3}>
          <Grid.Row>
            <Grid.Column>
              {this.renderPastTiles(0)}
            </Grid.Column>
            <Grid.Column>
              {this.renderPastTiles(1)}
            </Grid.Column>
            <Grid.Column>
              {this.renderPastTiles(2)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard
