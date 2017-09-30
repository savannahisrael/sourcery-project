import React, { Component } from 'react'
import { Button, Comment, Form, Image} from 'semantic-ui-react'
import axios from 'axios';
import io from 'socket.io-client';
import moment from 'moment';
import "./chat.css";

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
	  		author_id: this.props.user._id,
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
			  <Comment.Content>
					<Image className='chatImage' shape='circular' as='a' href={`https://github.com/${chat.author_id.github.login}`} src={chat.author_id.github.avatar_url} />
			    <Comment.Author as='a' href={`https://github.com/${chat.author_id.github.login}`}>{chat.author_id.github.name}</Comment.Author>
			    <Comment.Metadata>
			      <div>{formatDate(chat.date)}</div>
			    </Comment.Metadata>
			    <Comment.Text className='chatComment'>{chat.body}</Comment.Text>
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
							<Button fluid className='chatButton'>New Comment</Button>
						</Form>
			  	  </Form>
			  </Comment.Group>
		)
	}
}


export default InputExampleAction
