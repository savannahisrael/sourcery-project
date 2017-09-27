import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Dropdown, Image,  Menu, Visibility, Button} from 'semantic-ui-react';
import './landingNavbar.css';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  paddingBottom: '1em',
  paddingTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#344078',
  // opacity: '0.9',
  // border: '1px solid #ddd',
  // boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
  paddingBottom: '1em',
  paddingTop: '1em',
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
      <div className='landingnavBackground'>
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
            <Container >
              <Menu.Item name='DEVCIRCLE' href='/' onClick={this.handleItemClick} className='navFont'/>
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Button inverted color='white'>LOG IN</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>

      </div>

    )
  }
}
