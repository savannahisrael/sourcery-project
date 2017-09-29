import React from 'react';
import { Card, Icon, Image, Button, Label, Divider } from 'semantic-ui-react';
import './projectTiles.css';


const Tile = (props) => (
  <div>
    <Card centered raised className='tileCard' link href={`/${props.cohort_id.code}/${props.owner_id.github.login}/app/${props.name}`}>
      <Card.Content className='tileHeader'>
        <Image src={props.owner_id.github.avatar_url} size='tiny' shape='circular' className='projecttileIcon'/>
        <Card.Header className='tileTitle'>
          {props.name}
        </Card.Header>
      </Card.Content>
      <Card.Content className='tileContent'>
        <Divider/>
        <Card.Description className='tileState'>
          {props.formatDate(props.start_date)} | {props.duration} Weeks
        </Card.Description>
        <Divider/>
          {props.renderTechTags(props.tech_tags)}
        <Card.Description className='tileSummary'>
          {props.summary}
        </Card.Description>
      </Card.Content>
      <Card.Content extra >
        {props.members.slice(0, 4).map(member => 
          <Image as='a' className='tileTeam' shape='circular'
          src={member.github.avatar_url} href={`https://github.com/${member.github.login}`} />
        )}
          <Icon className='tileMore'name='ellipsis horizontal' size='large' />
          <br/>
      </Card.Content>
      <Button animated='vertical' fluid attached='bottom' className='tileJoin'>
        <Button.Content visible>
          View Details
        </Button.Content>
        <Button.Content hidden>
          {`${props.members_wanted - props.members.length + 1} spots left!`}
        </Button.Content>
      </Button>
    </Card>
    <br/><br/>
  </div>
)

export default Tile
