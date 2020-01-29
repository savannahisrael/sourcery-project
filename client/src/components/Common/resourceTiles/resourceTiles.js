import React, { Component } from 'react';
import { Card, Icon, Image, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './resourceTiles.css';




class ResourceTile extends Component {

  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes
  }

  handleLikes = () => {

  }

  handleDislikes = () => {

  }

  addToUserFavorites = () => {

  }

  addToHiddenList = () => {

  }



  render(props) {
    return (

      <div>
        <Card centered raised className='tileCard' >
          <Card.Content className='tileHeader'>
            <a href={this.props.other_url || this.props.s3_url || this.props.video_url} target="_blank"><Image src={this.props.img || this.props.video_url} size='medium' fluid /></a>
            <br />
            {/* <span className="fileType">{this.props.fileType} :</span><br/> */}
            <Card.Header className='tileTitle'>
              {this.props.title}
            </Card.Header>
          </Card.Content>
          <Card.Content className='tileContent'>

            <Divider />
            <Card.Description className='tileState'>
              <Button
                onClick={this.props.handleLikes}
                color='green'
                icon='thumbs up outline'
                label={{
                  basic: true, color: 'green', pointing: 'left',
                  content: this.props.likes
                }} />
              <Button
                onClick={this.props.handleDislikes}
                color='red'
                icon="thumbs down outline"
                label={{
                  basic: true,
                  color: 'red',
                  pointing: 'right',
                  content: this.props.dislikes
                }}
              />
            </Card.Description>
            <Divider />
            {this.props.renderTechTags(this.props.tech_tags)}
            <Card.Description className='tileSummary'>
              {this.props.description}
            </Card.Description>
          </Card.Content>

        <a href={this.props.other_url || this.props.s3_url || this.props.video_url} target="_blank">
          <Button animated='vertical' fluid attached='bottom' className='tileJoin' >
            <Button.Content visible>
              View {this.props.fileType}
            </Button.Content>
            <Button.Content hidden>
              {`See More`}
            </Button.Content>
            {/* </a> */}
          </Button></a>
        </Card>
        <br /><br />
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

export default ResourceTile;
