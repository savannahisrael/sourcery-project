import React from 'react';
import { Card, Icon, Image, Button, Label, Divider } from 'semantic-ui-react';
import './projectTiles.css';

const Tile = (props) => (
  <Card raised className='tileCard'>
    <Card.Content className='tileHeader'>
      <i className="devicon-angularjs-plain colored devIcon iconStyle"></i>
      <Card.Header className='tileTitle'>
        {props.title}
      </Card.Header>
    </Card.Content>
    <Card.Content className='tileContent'>
      <Divider/>
      <Card.Meta className='tileState'>
          {props.start_date} | {props.duration} Days
      </Card.Meta>
      <Divider/>
        {props.renderTechTags(props.tech_tags)}
      <Card.Description className='tileSummary'>
        {props.summary}
      </Card.Description>
    </Card.Content>
    <Card.Content extra >
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
        View Details
      </Button.Content>
      <Button.Content hidden>
        3 spots left!
      </Button.Content>
    </Button>
  </Card>
)

export default Tile
