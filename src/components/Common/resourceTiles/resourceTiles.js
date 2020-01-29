import React, { Component } from 'react';
import { Card, Icon, Image, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './resourceTiles.css';
import axios from 'axios';




class ResourceTile extends Component {

  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes,
    action: null,
  }

  // componentDidUpdate() {
  //   this.updateLikesDislikes()
  // }

  handleLikes = () => {
    // this.setState({
    //   likes: this.state.likes + 1,
    //   dislikes: this.state.dislikes,
    //   action: 'liked',
    // })
  }

  handleDislikes = () => {
    // this.setState({
    //   likes: this.state.likes,
    //   dislikes: this.state.dislikes + 1,
    //   action: 'disliked',
    // });
  }

//   updateLikesDislikes = e => {
//     const resourceId = this.props.resource._id;
//     if (this.state.action === "liked") {
//       let body = {likes: 1}
//       return axios.patch("/api/resources/" + resourceId + "/likesdislikes", body)
//   }
//   else if (this.state.action === "disliked") {
//     let body = {dislikes: 1}
//       return axios.patch("/api/resources/" + resourceId + "/likesdislikes", body)
//   }
// }

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
