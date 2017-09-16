import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Dropdown, Image,  Menu, Visibility, Button, Input} from 'semantic-ui-react';

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '3em',
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
  }

  handleOverlayRef = (c) => {
    const { overlayRect } = this.state

    if (!overlayRect) this.setState({ overlayRect: _.pick(c.getBoundingClientRect(), 'height', 'width') })
  }

  stickOverlay = () => this.setState({ overlayFixed: true })

  stickTopMenu = () => this.setState({ menuFixed: true })

  unStickOverlay = () => this.setState({ overlayFixed: false })

  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed} = this.state

    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <Menu
            borderless
            fixed={menuFixed && 'top'}
            style={menuFixed ? fixedMenuStyle : menuStyle}
          >
            <Container text>
              {/*<Menu.Item>
                <Image size='mini' src='/components/assets/images/dev.svg' />
              </Menu.Item>*/}
              <Menu.Item header>devCircle</Menu.Item>
              <Menu.Item as='a'>Explore</Menu.Item>
              <Menu.Item as='a'>Dashboard</Menu.Item>
              <Menu.Item>
                <Input icon='search' placeholder='Search...' />
              </Menu.Item>
              <Menu.Menu position='right'>
                <Dropdown icon='user circle' simple pointing className='link item'>
                  <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Log Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>
                  <Button primary>CREATE PROJECT</Button>
                </Menu.Item>
              </Menu.Menu>
            </Container>
          </Menu>
        </Visibility>
      </div>
    )
  }
}

// import React, { Component } from 'react'
// import { Dropdown, Sticky, Icon, Button, Input, Menu, Segment } from 'semantic-ui-react'
// // import logo from '../components/Images/dev.svg';


// export default class navigationBar extends Component {
//   state = { activeItem: 'dashboard' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <Sticky >
//         <Menu pointing secondary size='large'>
//           <Menu.Item name='devCircle' active={activeItem === 'devCircle'} onClick={this.handleItemClick} />
//           <Menu.Item>
//             <Input icon='search' placeholder='Search...' />
//           </Menu.Item>
//           <Menu.Menu position='right'>
//             <Menu.Item name='explore' active={activeItem === 'Explore'} onClick={this.handleItemClick} />
//             <Menu.Item name='dashboard' active={activeItem === 'Dashboard'} onClick={this.handleItemClick} />
//             <Dropdown item icon='user circle' simple>
//               <Dropdown.Menu>
//                 <Dropdown.Item>Profile</Dropdown.Item>
//                 <Dropdown.Item>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//             <Menu.Item>
//               <Button primary>CREATE PROJECT</Button>
//             </Menu.Item>
//           </Menu.Menu>
//         </Menu>
//       </Sticky>
//     )
//   }
// }
