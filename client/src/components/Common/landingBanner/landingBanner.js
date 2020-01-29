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
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary>LOGIN WITH GITHUB</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sticky>
    )
  }
}
