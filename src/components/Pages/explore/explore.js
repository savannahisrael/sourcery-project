import React, { Component } from "react";
import { Container, Divider, Header } from 'semantic-ui-react';
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import Navbar from "../../Common/navbar";
import './explore.css';

class Explore extends Component {
  render() {
    return (
      <div>
        <Navbar currentPage='explore' />
        <Divider/>
        <Header as='h4'>All Projects</Header>
        <Divider/>
        <TileGrid/>
      </div>
    );
  }
}

export default Explore;
