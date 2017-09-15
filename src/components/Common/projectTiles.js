import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const Tile = () => (
  <Card>
    <Image src='https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'/>
    <Card.Content>
      <Card.Header>
        DevCircle
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Started on 9/1/17
        </span>
      </Card.Meta>
      <Card.Description>
        An app for the continuing education of coding boot camp graduates
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        4 Devs
      </a>
    </Card.Content>
  </Card>
)

export default Tile
