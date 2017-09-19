import React from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import './projectTiles.css';

const Tile = (props) => (
  <Card raised>
    <Card.Content className='tileHeader'>
      <Card.Header className='tileTitle' >
        {props.title}
      </Card.Header>
      <i className="devicon-python-plain iconStyle"></i>
       <Card.Meta className='tileState'>
          {props.start_date} | {props.duration} Days
      </Card.Meta>
    </Card.Content>
    <Card.Content className='tileContent'>
        {props.renderTechTags}
        {/* <Label className='tileTags'>
          HTML/CSS
        </Label>
        <Label className='tileTags'>
          JavaScript
        </Label>
        <Label className='tileTags'>
          React
        </Label> <br/>
        <Label className='tileTags'>
          MySql
        </Label>
        <Label className='tileTags'>
          Responsive
        </Label>
        <Label className='tileTags'>
          Frontend
        </Label> */}
      <Card.Description>
        {props.summary}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
        <Image className='tileTeam' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' size='mini' shape='circular' />
        <Image className='tileTeam' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' size='mini' shape='circular' />
        <Image className='tileTeam' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' size='mini' shape='circular' />
        <Image className='tileTeam' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' size='mini' shape='circular' />
        <Icon  className='tileMore'name='ellipsis horizontal' size='large' />
        <br/>
        <Label className='tileCreator'>
          Creator
        </Label>
    </Card.Content>
    <Button animated='vertical' fluid attached='bottom' className='tileJoin' onClick={props.handleJoinButton}>
      <Button.Content visible>
        Join the team
      </Button.Content>
      <Button.Content hidden>
        3 spots left!
      </Button.Content>
    </Button>
  </Card>
)

export default Tile
