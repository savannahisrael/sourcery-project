import React, { Component } from "react";
import { Item, Icon, Button, Divider } from 'semantic-ui-react';


class MemberBlock extends Component {

  state = {
    eject: false
  }

  handleXClick = () => {
    this.setState({eject: !this.state.eject});
  }

  handleEject = () => {
    console.log('clicked eject button');
  }

  handleReject = () => {
    this.setState({eject: false});
  }

  render() {
    return (
      <Item.Group>
        <Icon link color='grey' className='projectRemove'
        fitted name='remove' size='large' onClick={this.handleXClick} />
          <Item link href={`https://github.com/${this.props.github.login}`}>
          <Item.Image size='mini' src={this.props.github.avatar_url} shape='circular' />
          <Item.Content>
            <Item.Header>{this.props.github.name}</Item.Header>
            <Item.Meta>{`${this.props.contributions.commits} commits`}</Item.Meta>
            <Item.Meta>{`${this.props.contributions.additions} ++ / ${this.props.contributions.deletions} --`}</Item.Meta>
          </Item.Content>
        </Item>
        {this.state.eject ?
        <div>
          <Item.Content className='projectEject'>Are you sure you want to eject this team member?</Item.Content>
          <div className='ui two buttons'>
            <Button fluid basic color='red' onClick={this.handleEject}>Yes, Eject</Button>
            <Button fluid basic color='green' onClick={this.handleReject} >No</Button>
          </div>
        </div>
        : ''
        }
        <Divider/>
      </Item.Group>
    )
  }
}

export default MemberBlock;
