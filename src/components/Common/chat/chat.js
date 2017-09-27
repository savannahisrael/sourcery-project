import React, { Component } from 'react'
import { Input, Button, Comment, Form, Header, Divider } from 'semantic-ui-react'
import axios from 'axios';
import io from 'socket.io-client';
const socket = io();


const testData = [
	{
		avatar: "https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg",
		name: "Matt",
		date: "06/15/17",
		body: "Whoa! guys?!",
		_id: 1
	},
	{
		avatar: "https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg",
		name: "Joe",
		date: "06/15/17",
		body: "Yeah, really!",
		_id: 2
	}
]

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
			    <Comment.Author as='a'>{chat.author_id.github.name}</Comment.Author>
			    <Comment.Metadata>
			      <div>{chat.date}</div>
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
