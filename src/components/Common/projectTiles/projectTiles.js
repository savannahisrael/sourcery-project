import React from 'react';
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react';
import './projectTiles.css';

const Tile = () => (
  <Card raised>

    <Card.Content className='tileHeader'>
      <Card.Header className='tileTitle' >
        Project Title Goes Here and Second Line If Needed
      </Card.Header>
      <i className="devicon-python-plain iconStyle"></i>
      {/*<svg className='svgicon' viewBox="0 0 80 80" width="48" height="48" fill="#FFFFFF"  xmlns="http://www.w3.org/2000/svg" aria-labelledby="title"><title>Python Icon</title><path d="M71.13 20.13H59.87V8.87L51 0H29l-8.87 8.87v11.26H8.87L0 29v22l8.87 8.87h11.26v11.26L29 80h22l8.87-8.87V59.87h11.26L80 51V29zM10.75 55.35l-6.22-6.22V30.87l6.22-6.22H40v-4.52H24.65v-9.38l6.22-6.22h18.26l6.22 6.22v18.16l-8.75 8.83H31.52L20.13 49.13v6.22zm64.72-6.22l-6.22 6.22H40v4.53h15.35v9.38l-6.22 6.22H30.87l-6.22-6.22V51l8.74-8.74h15.1l11.38-11.5v-6.11h9.38l6.22 6.22z"></path><path d="M30.19 9.81h4.53v5.03h-4.53zM45.28 65.16h4.53v5.03h-4.53z"></path></svg>*/}
       <Card.Meta className='tileState'>
          Sept 16 | 3 weeks
      </Card.Meta>
    </Card.Content>
    <Card.Content className='tileContent'>
        <Label className='tileTags'>
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
        </Label>
      <Card.Description>
        An app for the continuing education of coding boot camp graduates
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
        <Button animated='vertical' fluid
      attached='bottom'
      className='tileJoin'>
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
