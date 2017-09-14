import React, { Component } from "react";
import { Image, Header } from 'semantic-ui-react';

class Profile extends Component {
  render() {
    return (
      <div>
        <Image src='http://lorempixel.com/output/cats-q-c-480-480-1.jpg' size='medium' shape='circular' centered />

        <Header textAlign='center' as='h1'>
          Mr. Dev Circle
        </Header>

      </div>
    );
  }
}

export default Profile
