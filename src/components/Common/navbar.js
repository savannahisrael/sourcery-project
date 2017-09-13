import React, { Component } from 'react'
import { Dropdown, Sticky, Icon, Button, Input, Menu, Segment } from 'semantic-ui-react'
// import logo from '../components/Images/dev.svg';


export default class navigationBar extends Component {
  state = { activeItem: 'dashboard' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Sticky >
        <Menu pointing secondary size='large'>
          <Menu.Item name='devCircle' active={activeItem === 'devCircle'} onClick={this.handleItemClick} />
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='explore' active={activeItem === 'Explore'} onClick={this.handleItemClick} />
            <Menu.Item name='dashboard' active={activeItem === 'Dashboard'} onClick={this.handleItemClick} />
            <Dropdown item icon='user circle' simple>
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item>
              <Button primary>CREATE PROJECT</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sticky>
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

