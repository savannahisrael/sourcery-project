import React, { Component } from "react";
import { Container, Image, Header, Segment, Grid, Card, Icon } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";

class Project extends Component {
  render(props) {
    return (
    <Container>
      <Navbar currentPage='profile' />
      <br/><br/>
      <Image src='http://lorempixel.com/output/cats-q-c-480-480-1.jpg' size='small' shape='circular' centered />
      <Container text textAlign='center'>
        <Header textAlign='center' as='h1'>
          Cindy Chen
          <p>Cohort: {this.props.match.params.cohort}</p>
          <p>Username: {this.props.match.params.username}</p>
          <Header.Subheader>
            www.cindygchen.com
          </Header.Subheader>
        </Header>
        <p>Cindy is a UX designer based in San Diego.</p>
      </Container>
      <br/><br/>
      <Grid textAlign='center'>
        <Grid.Row columns={3}>
          <Grid.Column>
            <p> Projects Created </p>
            <h1>54</h1>
          </Grid.Column>
          <Grid.Column>
          <p> Projects Contributions </p>
            <h1>23</h1>
          </Grid.Column>
          <Grid.Column>
            <p> Github Repos </p>
            <h1>35</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    );
  }
}

export default Project
