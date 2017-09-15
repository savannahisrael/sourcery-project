import React from 'react';
import { Sticky, Segment, Container, Divider, Image, List, Grid, Header } from 'semantic-ui-react';

const footer = () => (
  <div>
    <Segment
          inverted
          style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
          vertical
        >
          <Container textAlign='center'>
            <Image src='/logo.png' centered size='mini' />
            <p>
              Made in San Diego © devCircle 2017
            </p>
          </Container>
        </Segment>
  </div>
)


export default footer