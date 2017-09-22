import React, { Component } from "react";
import { Container, Image, Header, Table, Segment, Grid, Rail, Divider, Button, Comment, Form, List, Menu } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import projectData from '../../../utils/sampleData/sampleProjects.json';
import './project.css';


class Project extends Component {

  state = {
    project: projectData[0]
  };

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

  render(props) {
    return (
      <div>
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
        <Grid centered columns={3} className='projectBackground'>
          <Grid.Column>
          
            <Segment className='projectSegment'>
              <Menu pointing secondary>
                <Menu.Item name='Team Chat' />
                <Menu.Item name='messages' />
                {/* <Menu.Item name='Team Chat' active={activeItem === 'Team Chat'} onClick={this.handleItemClick} />
                <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} /> */}
              </Menu>
                 {/* <Header textAlign='center' as='h3'>Chat</Header> */}
                  <Comment.Group>
                    <Comment>
                      <Comment.Avatar src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini'/>
                      <Comment.Content>
                        <Comment.Author as='a'>Matt</Comment.Author>
                        <Comment.Metadata>
                          <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>How artistic!</Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                    <Comment>
                      <Comment.Avatar src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini'/>
                      <Comment.Content>
                        <Comment.Author as='a'>Elliot Fu</Comment.Author>
                        <Comment.Metadata>
                          <div>Yesterday at 12:30AM</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          <p>This has been very useful for my research. Thanks as well!</p>
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                      <Comment.Group>
                        <Comment>
                          <Comment.Avatar src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini'/>
                          <Comment.Content>
                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                            <Comment.Metadata>
                              <div>Just now</div>
                            </Comment.Metadata>
                            <Comment.Text>
                              Elliot you are always so right :)
                            </Comment.Text>
                            <Comment.Actions>
                              <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                          </Comment.Content>
                        </Comment>
                      </Comment.Group>
                    </Comment>
                    <Comment>
                      <Comment.Avatar src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini'/>
                      <Comment.Content>
                        <Comment.Author as='a'>Joe Henderson</Comment.Author>
                        <Comment.Metadata>
                          <div>5 days ago</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          Dude, this is awesome. Thanks so much
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                    <Form reply>
                      <Form.TextArea />
                      <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                    </Form>
                  </Comment.Group>

              <Rail position='right'>
                <Segment className='projectSegment'>
                  <Header as='h3'>Team Members</Header>
                  <Divider />
                  <Container>
                    <Table basic='very' size='large' celled collapsing>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Header as='h4' image>
                              <Image src='http://lorempixel.com/output/cats-q-c-100-100-5.jpg' shape='rounded' size='mini' />
                              <Header.Content>
                                  Aaron Gaither
                                <Header.Subheader>Project Captain</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as='h4' image>
                              <Image src='http://lorempixel.com/output/cats-q-c-100-100-7.jpg' shape='rounded' size='mini' />
                              <Header.Content>
                                  Fahad Rahman
                                <Header.Subheader>First Mate</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as='h4' image>
                              <Image src='http://lorempixel.com/output/cats-q-c-100-100-8.jpg' shape='rounded' size='mini' />
                              <Header.Content>
                                  Bryce Miller
                                <Header.Subheader>Deckhand</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>

                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as='h4' image>
                              <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini' />
                              <Header.Content>
                                  Cindy Chen
                                <Header.Subheader>UX Wench</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Container>
                  <Header as='h3'>Pending Members</Header>
                  <Divider />
                  <Container>
                    <List>
                      <List.Item>
                        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
                        <List.Content float='right'>
                          <List.Header as='a'>Rachel</List.Header>
                          <List.Description>Coding Ninja</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
                        <List.Content>
                          <List.Header as='a'>Lindsay</List.Header>
                          <List.Description>Prefers Tabs over Spaces</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
                        <List.Content>
                          <List.Header as='a'>Matthew</List.Header>
                          <List.Description>That guy who types really hard.</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
                        <List.Content>
                          <List.Header as='a'>Jenny Hess</List.Header>
                          <List.Description>"She doesn't even go here!"</List.Description>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <Image src='http://lorempixel.com/output/cats-q-c-100-100-3.jpg' shape='rounded' size='mini'/>
                        <List.Content>
                          <List.Header as='a'>Veronika Ossi</List.Header>
                          <List.Description>Is literally just a cat...</List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Container>
                </Segment>
              </Rail>

              <Rail position='left'>
              <Segment className='projectSegment'>
              <Header as='h3'>Project Details</Header>
              <Divider />
              <Header as='h4'>Description</Header>
              <p>{this.state.project.description}</p>
              <Divider />
              <Header as='h4'>Start Date</Header>
              <p>{this.state.project.start_date}</p>
              <Divider />
              <Header as='h4'>Duration</Header>
              <p>{this.state.project.duration} days</p>
              <Divider />
              <Header as='h4'>Devs Wanted</Header>
              <p>{this.state.project.members_wanted}</p>
              <Divider />
              <Header as='h4'>Technology</Header>
              <p>{this.state.project.tech_tags.join(', ')}</p>
              </Segment>
              </Rail>
            </Segment>
          </Grid.Column>
        </Grid>

        <br/><br/>

        <Segment>
          <Container text>
            <Header as='h3'>Resources</Header>
            <Divider />
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
            <List divided relaxed>
      `       <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={this.state.project.repo_link} target='_blank'>Github Link</List.Header>
                  {/* <List.Description as='a'>Updated 10 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='google' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={this.state.project.google_drive_link} target='_blank'>Google Drive Link</List.Header>
                  {/* <List.Description as='a'>Updated 22 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='trello' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={this.state.project.trello_link} target='_blank'>Trello Link</List.Header>
                  {/* <List.Description as='a'>Updated 34 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='external' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={this.state.project.deploy_link} target='_blank'>Deployment Link</List.Header>
                  {/* <List.Description as='a'>Updated 34 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
            </List>`
          </Container>
        </Segment>

      </div>
    );
  }
}

export default Project
