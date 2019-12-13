import React, { Component } from "react";
import { Tab, Label, Container, Image, Header, Segment, Grid, Divider, Button, Item, Icon, Card } from 'semantic-ui-react';
import Navbar from "../../Common/navbar";
import Chat from "../../Common/chat";
import { Link } from 'react-router-dom';
import './project.css';
import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';

class Project extends Component {

    constructor (props) {
        super(props)
        const socket = io();

        this.state = {
            socket,
            dataLoaded: false,
            // priviledge: 'public',
            userID: this.props.auth
          };
    }

    componentDidMount() {
        //fetch resource data
        this.fetchResourceData().then(() => {
            
                // this.setPriveledge();
                this.state.socket.emit('join', this.state._id);
                this.state.socket.on('refreshMsg', data => {
                  this.fetchProjectData();
                })
                this.setState({dataLoaded: true});
                console.log('State after fetch:',this.state);
            })
            .catch(error => console.log('Error on setup:', error));
          }

          //leave socket
  componentWillUnmount() {
    this.state.socket.emit('leave', this.state._id)
  }

  fetchProjectData = () => {
    return axios.get(`/api/projectData${this.props.project}`).then(res => {
      // console.log('Project data:',res.data);
      this.setState({ ...res.data[0] });
      return res.data[0]
    }).catch(error => {
      console.log('Error while fetching data:', error);
      return error;
    });
  }
}


export default Project;