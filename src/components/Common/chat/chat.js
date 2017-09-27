import React, { Component } from 'react'
import { Input, Button, Comment, Form, Header, Divider } from 'semantic-ui-react'
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';
const socket = io();

const formatDate = date => moment(date).format('MM/DD/YYYY');

class InputExampleAction extends Component {

	constructor(props){
		super(props)
		this.state = {
			chatInput: ''
		}
	}

	handleSubmit = event => {
	  event.preventDefault();
	  if (this.state.chatInput.length) {
	  	const newChat = {
	  		body: this.state.chatInput,
	  		author_id: '59c98010339e5c29743839e5', //this.props.user once using log-ins
	  		date: new Date(),
	  		chat_type: this.props.chat_type
	  	}
	  	axios.patch('/api/projects', {projectId: this.props.projectId, update: {$push: {chat:newChat}}})
	  	.then(res => {
	  		socket.emit('newMsg', newChat)
	  	})
	  	.catch(err => console.log('Err on chat push to db:', err))
	  	this.setState({chatInput: ''});
	  }
	}

	handleChange = event => {
	  this.setState({ chatInput: event.target.value });
	}

	renderChatMessage = chat => {
		return (
			<Comment key={chat._id}>
			  <Comment.Avatar src={chat.author_id.github.avatar_url} />
			  <Comment.Content>
			    <Comment.Author as='a' href={`/${this.props.cohort}/${chat.author_id.github.login}/profile`}>{chat.author_id.github.name}</Comment.Author>
			    <Comment.Metadata>
			      <div>{formatDate(chat.date)}</div>
			    </Comment.Metadata>
			    <Comment.Text>{chat.body}</Comment.Text>
			  </Comment.Content>
			</Comment>
			)
	}

	render () {
		return (
			  <Comment.Group size='small'>
				  {this.props.chats.map(e => this.renderChatMessage(e))}
				  <Form reply onSubmit={this.handleSubmit}>
						<Form reply>
							<Form.TextArea maxLength="140" name="chatInput" value={this.state.chatInput} onChange={this.handleChange} style={{ minHeight: 50 }}/>
							<Button fluid >New Comment</Button>
						</Form>
			  	  </Form>
			  </Comment.Group>
		)
	}
}


export default InputExampleAction
