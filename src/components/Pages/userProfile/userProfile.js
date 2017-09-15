import React, { Component } from "react";
import { Container, Image, Header, Segment, Grid } from 'semantic-ui-react';

class Project extends Component {
  render() {
    return (
    <div>
        <br/><br/>
        <Grid centered columns={3}>
            <Segment>
                <Image src='http://lorempixel.com/output/cats-q-c-480-480-1.jpg' size='small' shape='circular' centered />
                <Header textAlign='center' as='h1'>
                Cindy Chen
                    <Header.Subheader>
                        www.cindygchen.com
                    </Header.Subheader>
                </Header>
                <Container text textAlign='center'>
                <p>Bio goes here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium.</p>
                </Container>
            </Segment>
        </Grid>
    </div>
    );
  }
}

export default Project
