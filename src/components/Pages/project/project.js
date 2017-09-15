import React, { Component } from "react";
import { Container, Image, Header, Table, Segment, Grid, Rail, Divider, Button, Comment, Form, List } from 'semantic-ui-react';

class Project extends Component {
  render() {
    return (
      <div>
        <Image src='http://lorempixel.com/output/cats-q-c-480-480-1.jpg' size='medium' shape='circular' centered />

        <Header textAlign='center' as='h1'>
          DevCircle
        </Header>
        <Segment>
        <Container text textAlign='center'>
          <p>Summary goes here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium.</p>
        </Container>
        </Segment>
        <Grid centered columns={3}>
          <Grid.Column>

            <Segment>
              <Header as='h3'>Project Details</Header>
              <Divider />
              <Header as='h4'>Description</Header>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium.</p>
              <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
              <Divider />
              <Header as='h4'>Start Date</Header>
              <p>9/13/17</p>
              <Divider />
              <Header as='h4'>Duration</Header>
              <p>21 days</p>
              <Divider />
              <Header as='h4'>Devs Wanted</Header>
              <p>3</p>
              <Divider />
              <Header as='h4'>Technology</Header>
              <p>Express, React, MongoDB, Mongoose, Node, Passport</p>

              <Rail position='left'>
                <Segment>
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
                          {/* <Table.Cell>
                              22
                          </Table.Cell> */}
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
                          {/* <Table.Cell>
                              15
                          </Table.Cell> */}
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
                          {/* <Table.Cell>
                              12
                          </Table.Cell> */}
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
                          {/* <Table.Cell>
                              11
                          </Table.Cell> */}
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Container>
                </Segment>

                <Segment>
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

              <Rail position='right'>
                <Segment>
                  <Header as='h3'>Chat</Header>
                  <Divider />
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
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.</p>
            <List divided relaxed>
      `       <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Github Link</List.Header>
                  {/* <List.Description as='a'>Updated 10 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='google' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Google Drive Link</List.Header>
                  {/* <List.Description as='a'>Updated 22 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='trello' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Trello Link</List.Header>
                  {/* <List.Description as='a'>Updated 34 mins ago</List.Description> */}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='external' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a'>Deployment Link</List.Header>
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
