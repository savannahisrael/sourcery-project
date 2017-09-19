import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Dropdown, Image,  Menu, Visibility, Button, Input} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '.5em',
  marginTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}


export default class navBar extends Component {
  state = {
    menuFixed: false,
    overlayFixed: false,
    activeItem: this.props.currentPage
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render () {
    const { menuFixed } = this.state
    const { activeItem } = this.state

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            pointing secondary
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container text>
              {/*<Menu.Item>
                <Image size='mini' src='/components/assets/images/dev.svg' />
              </Menu.Item>*/}
              <Menu.Item name='devCircle' href='/' onClick={this.handleItemClick}/>
              <Menu.Item name='explore' href='explore' active={activeItem === 'explore'} onClick={this.handleItemClick} />
              <Menu.Item name='dashboard' href='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} />
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Menu.Menu position='right'>
                <Dropdown icon='user circle' simple pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
                    <Dropdown.Item>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>
                  <Button color='teal'>CREATE PROJECT</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
      </div>
    )
  }
}
