import React, { Component } from "react";
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import './explore.css';

class Explore extends Component {
  render() {
    return (
      <contentContainer>
        <TileGrid/>
      </contentContainer>
    );
  }
}

export default Explore;
