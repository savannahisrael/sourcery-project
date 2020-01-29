import React from 'react';
import { Segment, Container, Image } from 'semantic-ui-react';
import "./footer.css";

const footer = () => (
  <div>
    <Segment inverted vertical sticky className='footerBackground'>
      <Container className='footer' textAlign='center'>
        {/* <Image src='/logo.png' centered size='mini' /> */}
        <p>Developed by Savannah Israel    ©SOURCERY    2020</p>
      </Container>
    </Segment>
  </div>
)


export default footer
