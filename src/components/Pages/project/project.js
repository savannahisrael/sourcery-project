import React, { Component } from "react";
import { Tab, Label, Container, Image, Header, Table, Segment, Grid, Rail, Divider, Button, Comment, Form, Item, List, Menu, Icon, Card, Statistic } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import Chat from "../../Common/chat";
import projectData from '../../../utils/sampleData/sampleProjects.json';
import './project.css';
import axios from 'axios';

const panes = [
  { menuItem: 'Team Chat', render: () =>
    <Tab.Pane attached={false}>
      <Chat/>
    </Tab.Pane> },
  { menuItem: 'Public Forum', render: () =>
    <Tab.Pane attached={false}>
      <Chat/>
    </Tab.Pane> }
]

class Project extends Component {

  state = {
    userID: {},
    project: {},
    activeItem: 'public'
  };

  componentDidMount() {
    axios.get('../api/projectData').then((res) => {
      this.setState({ project: res.data });
      console.log(res.data);
    }).catch((error) => {
      console.log('Catching Error: ', error);
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderTeamMembers = () => {
    return this.state.project.members.map(member => (
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini' />
            <Header.Content>
                {member}
              {/* <Header.Subheader>Project Captain</Header.Subheader> */}
            </Header.Content>
          </Header>
        </Table.Cell>
      </Table.Row>
    ));
  }

  renderPendingMembers = () => {
    return this.state.project.pending_members.map(pending_member => (
      <List.Item>
        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
        <List.Content float='right'>
          <List.Header as='a'>{pending_member}</List.Header>
          {/* <List.Description>Coding Ninja</List.Description> */}
        </List.Content>
      </List.Item>
    ));
  }

  // renderTechTags = (tech_tags) => {
  //   return tech_tags.map(tech_tag => (
  //     <Label className='tileTags'>
  //       {tech_tag}
  //     </Label>
  //   ));
  // }

  render(props) {

    const { activeItem } = this.state.activeItem

    return (
      <div className='projectBackground'>
        <Navbar currentPage='project' />
        <Segment textAlign='center' vertical className='projectBanner'>
          <Container text>
            <i className="devicon-angularjs-plain colored devIcon"></i>
            <Header textAlign='center' as='h1' className='projectTitle'>
            {this.state.project.name}
            {/* <p>Cohort: {this.props.match.params.cohort}</p>
            <p>Username: {this.props.match.params.username}</p>
            <p>Project: {this.props.match.params.project}</p> */}
            </Header>
            <br/><br/><br/>
            <p className='projectSummary'>{this.state.project.summary}</p>
          </Container>
        </Segment>

        <Grid centered columns={3} className='projectGrid'>
          <Grid.Column>



            <Segment className='projectSegment'>
              <Label attached='top'>in-progress</Label>

              <Segment basic>
                <Header as='h3'>Project Details</Header>
                {/* {this.renderTechTags(this.state.project.tech_tags)}<br/><br/> */}
                <p>{this.state.project.description}</p>
                <div floated='right'>
                  <Icon link name='github' size='large' link={this.state.project.repo_link} />
                  <Icon link name='google' size='large' link={this.state.project.google_drive_link} />
                  <Icon link name='trello' size='large' link={this.state.project.trello_link}  />
                </div>
                <Segment>
                  <Header>{this.state.project.start_date}</Header>
                  <p>Projected Start Date</p>
                </Segment>
                <Segment>
                  <Header>{this.state.project.duration} weeks </Header>
                  <p>Project Length</p>
                </Segment>
                <Segment>
                  <Header>{this.state.project.members_wanted} members</Header>
                  <p>Team Size</p>
                </Segment>
              </Segment>

              <Segment basic className='projectChat'>
                <Tab menu={{ secondary: true, pointing: true }} panes={panes}/>
              </Segment>

              <Rail position='left'>

                <Segment className='pullRequest'>
                  <Header as='h3'>Pull Requests</Header>
                  <Divider/>
                  <Item.Group link>
                    <Item>
                      <Item.Image size='mini' src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded'  />
                      <Item.Content>
                        <Item.Header>Cindy Chen</Item.Header>
                        <Item.Meta>30 commits / 1,287 ++ / 623 --</Item.Meta>
                      </Item.Content>
                    </Item>
                    <Divider/>
                  </Item.Group>
                </Segment>

                <Card.Group>
                  <Card className='projectSegment'>
                    <Card.Content>
                      <Header as='h3'>Project Details</Header>
                      <p>{this.state.project.description}</p>
                      <div floated='right'>
                        <Icon link name='github' size='large' link={this.state.project.repo_link} />
                        <Icon link name='google' size='large' link={this.state.project.google_drive_link} />
                        <Icon link name='trello' size='large' link={this.state.project.trello_link}  />
                      </div>
                      <Card>
                        <Card.Content>
                          <Card.Header> {this.state.project.start_date} </Card.Header>
                          <Card.Meta>Projected Start Date</Card.Meta>
                        </Card.Content>
                      </Card>
                      <Card>
                        <Card.Content>
                          <Card.Header> {this.state.project.duration} weeks </Card.Header>
                          <Card.Meta>Project Length</Card.Meta>
                        </Card.Content>
                      </Card>
                      <Card>
                        <Card.Content>
                          <Card.Header> {this.state.project.members_wanted} members</Card.Header>
                          <Card.Meta>Team Size</Card.Meta>
                        </Card.Content>
                      </Card>
                      <Header as='h4'>Technologies Involved</Header>
                      {/* {this.renderTechTags(this.state.project.tech_tags)} */}
                    </Card.Content>
                    <Card.Content extra>
                        <Button fluid className='projectCheck' > View Live Demo </Button>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Rail>

              <Rail position='right'>
              <Segment className='joinRequest'>
                  <Button fluid className='projectJoin' link={this.state.project.deploy_link}>Request to Join!</Button>
              </Segment>
              <Card.Group>
                  <Card className='projectRequest'>
                    <Card.Content>
                      <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini' verticalAlign='middle' /> <span> <strong> Cindy Chen </strong> wants to join.</span>
                    </Card.Content>
                    <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button fluid className='projectClose' >Decline</Button>
                        <Button fluid className='projectCheck' >Approve</Button>
                      </div>
                    </Card.Content>
                  </Card>
                </Card.Group>

                <Segment className='projectSegment'>
                  <Header as='h3'>Team Members</Header>
                  <Divider/>
                  <Item.Group link>
                    <Item>
                      <Item.Image size='mini' src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded'  />
                      <Item.Content>
                        <Item.Header>Cindy Chen</Item.Header>
                        <Item.Meta>30 commits / 1,287 ++ / 623 --</Item.Meta>
                      </Item.Content>
                    </Item>
                    <Divider/>
                    <Item>
                      <Item.Image size='mini' src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded'  />
                      <Item.Content>
                        <Item.Header>Cindy Chen</Item.Header>
                        <Item.Meta>30 commits / 1,287 ++ / 623 --</Item.Meta>
                      </Item.Content>
                    </Item>
                    <Divider/>
                    <Item>
                      <Item.Image size='mini' src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded'  />
                      <Item.Content>
                        <Item.Header>Cindy Chen</Item.Header>
                        <Item.Meta>30 commits / 1,287 ++ / 623 --</Item.Meta>
                      </Item.Content>
                    </Item>
                    <Divider/>
                    <Item>
                      <Item.Image size='mini' src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded'  />
                      <Item.Content>
                        <Item.Header>Cindy Chen</Item.Header>
                        <Item.Meta>30 commits / 1,287 ++ / 623 --</Item.Meta>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Rail>
            </Segment>
          </Grid.Column>
        </Grid>

       </div>
    );
  }
}

export default Project
