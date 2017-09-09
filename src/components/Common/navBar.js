import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }
  

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item name='devCircle' active={activeItem === 'devCircle'} onClick={this.handleItemClick} />
        <Menu.Item name='explore' active={activeItem === 'explore'} onClick={this.handleItemClick} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}
//  sticky nav
//   $(document)
//     .ready(function() {

//       // fix main menu to page on passing
//       $('.main.menu').visibility({
//         type: 'fixed'
//       });
//       $('.overlay').visibility({
//         type: 'fixed',
//         offset: 80
//       });

//       // lazy load images
//       $('.image').visibility({
//         type: 'image',
//         transition: 'vertical flip in',
//         duration: 500
//       });

//       // show dropdown on hover
//       $('.main.menu  .ui.dropdown').dropdown({
//         on: 'hover'
//       });
//     })
//   ;
