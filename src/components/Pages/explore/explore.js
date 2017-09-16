import React, { Component } from "react";
import contentContainer from '../../Common/contentContainer';
import TileGrid from '../../Common/tileGrid';
import Navbar from "../../Common/navbar";
import './explore.css';

class Explore extends Component {
  render() {
    return (
      <div>
        <Navbar currentPage='explore' />
        <contentContainer>
          <TileGrid/>
        </contentContainer>
      </div>
    );
  }
}

export default Explore;
