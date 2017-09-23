import React, { Component } from 'react'
import { Input, Button, Comment, Form, Header } from 'semantic-ui-react'
import io from 'socket.io-client';
import axios from 'axios';
const socket = io();

const testData = [
	{
		avatar: "https://react.semantic-ui.com/assets/images/avatar/small/elliot.jpg",
		name: "Matt",
		date: "06/15/17",
		body: "Whoa! guys?!",
		id: 1
	},
	{
		avatar: "https://react.semantic-ui.com/assets/images/avatar/small/joe.jpg",
		name: "Joe",
		date: "06/15/17",
		body: "Yeah, really!",
		id: 2
	}
]

class InputExampleAction extends Component {

	state = {
		chatInput: '',
		chats: testData
	}

	componentWillMount() {
		socket.on('connect', () => console.log('Chat connected, yo!'));
		socket.on('refreshMsg', data => {
			console.log("Refresh Msg Requested")
			// axios.get('../api/projects/')
		})
	}

	handleSubmit = event => {
	  event.preventDefault();
	  if (this.state.chatInput.length) {
	  	console.log('Msg:',this.state.chatInput)
	  	const newChat = {
	  		body: this.state.chatInput,
	  		name: this.state.username,
	  		avatar: this.state.avatar,
	  		date: new Date(),
	  		type: private
	  	}
	  	// axios.patch('../api/projects', newChat)
	  	// .then(res => axios.get('..api/projects'))
	  	// .then(res => this.setState({chats: res.data})

	  	socket.emit('newMsg', {msg: this.state.chatInput, type: 'public'});
	  	this.setState({chats: newChats});
	  	this.setState({chatInput: ''});

	  }
	}

	handleChange = event => {
	  this.setState({ chatInput: event.target.value });
	}

	renderChatMessage = chatObj => {
		return (
			<Comment key={chatObj.id}>
			  <Comment.Avatar src={chatObj.avatar} />
			  <Comment.Content>
			    <Comment.Author as='a'>{chatObj.name}</Comment.Author>
			    <Comment.Metadata>
			      <div>{chatObj.date}</div>
			    </Comment.Metadata>
			    <Comment.Text>{chatObj.body}</Comment.Text>
			  </Comment.Content>
			</Comment>
			)
	}

	render () {
		return (
			  <Comment.Group size='mini'>
				  <Header as='h3' dividing>Comments</Header>
				  {this.state.chats.map(e => this.renderChatMessage(e))}
				  <Form reply onSubmit={this.handleSubmit}>
				  	  <Form.Group>
				  	      <Form.Input maxLength="140" name="chatInput" value={this.state.chatInput} onChange={this.handleChange}/>
				  	      <Button content='Submit' labelPosition='left' icon='edit' primary/>
				  	  </Form.Group>
			  	  </Form>
			  </Comment.Group>		
		)
	}
}


export default InputExampleAction