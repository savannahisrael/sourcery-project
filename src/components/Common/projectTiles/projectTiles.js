import React from 'react';
import { Card, Icon, Image, Feed } from 'semantic-ui-react';
import icon from '../../../assets/images/projectIcons/python.svg';

const Tile = () => (
  <Card >
    <Card.Content>
      <Card.Header>
        Project Title Goes Here
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Starts on 16 September 2017
        </span>
      </Card.Meta>
      <Card.Description>
        An app for the continuing education of coding boot camp graduates
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Feed>
        <Feed.Event>
          <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
          <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
          <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
          <Feed.Label image='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />
        </Feed.Event>
      </Feed>
    </Card.Content>
  </Card>
)

export default Tile
