import React, {Component} from 'react';
import { Card, Icon, Image, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './projectTiles.css';




class Tile extends Component {

  state= {

  }


    render(props) {
    return (
      
      <div>
        <Card centered raised className='tileCard' >
          <Card.Content className='tileHeader'>
            <a href={this.props.other_url || this.props.s3_url || this.props.video_url} target="_blank"><Image src={this.props.img || this.props.video_url} size='medium'  fluid/></a>
            <Card.Header className='tileTitle'>
              {this.props.title}
              {this.props.fileType}
            </Card.Header>
          </Card.Content>
          <Card.Content className='tileContent'>

            <Divider/>
            <Card.Description className='tileState'>
            <Button color='green' content='Likes' icon='thumbs up outline'  label={{ basic: true, color: 'green', pointing: 'left', content:this.props.likes }}
    />| <Button
    basic
    color='red'
    content="Dislikes"
    icon="thumbs down outline"
    label={{
      basic: true,
      color: 'red',
      pointing: 'right',
      content: this.props.dislikes
    }}
  />
            </Card.Description>
            <Divider/>
              {this.props.renderTechTags(this.props.tech_tags)}
            <Card.Description className='tileSummary'>
              {this.props.description}
            </Card.Description>
          </Card.Content>
    
           
          <Button animated='vertical' fluid attached='bottom' className='tileJoin' >
            {/* <a href={`/api/projects/${this.props.cohort}/${this.props.username}/app/${this.props.title}`} target="_blank" > */}
            <Button.Content visible>
            View Details
            </Button.Content>
            <Button.Content hidden>
              {`See More`}
            </Button.Content>
            {/* </a> */}
          </Button>
        </Card>
        <br/><br/>
      </div>
    )
  // } else {
  //   return (
  //     <div>
  //     </div>
  //   )
  // }
}
}

export default Tile;
