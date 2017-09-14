import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

export default class userProfile extends Component {

  render() {
    return (
      <div>


        <Segment
          textAlign='center'
          style={{ minHeight: 700, padding: '1em 0em' }}
          vertical
        >
          <Container text>
            <Image src='/assets/images/wireframe/square-image.png' size='medium' shape='circular' />
            <Header
              as='h1'
              content='Cindy Chen'
              style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1.5em' }}
            />
            <Header
              as='h2'
              content='Cindygchen'
              style={{ fontSize: '1.5em', fontWeight: 'normal' }}
            />
          </Container>
        </Segment>
      </div>
    )
  }
}