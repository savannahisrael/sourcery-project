import React from 'react';
import { Sticky, Segment, Container, Divider, Image, List, Grid, Header } from 'semantic-ui-react';
import "./footer.css";

const footer = () => (
  <div>
    <Segment inverted vertical sticky>
      <Container className='footer' textAlign='center'>
        <Image src='/logo.png' centered size='mini' />
        <p>Made in San Diego © devCircle 2017</p>
      </Container>
    </Segment>
  </div>
)


export default footer
