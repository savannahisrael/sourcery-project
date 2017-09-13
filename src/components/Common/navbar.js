
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


import React, { Component } from 'react'
import {
  Button,
  Container,
  Menu,
  Segment,
  Visibility,
  Dropdown,
  Input
} from 'semantic-ui-react'

const FixedMenu = () => (
  <Menu pointing secondary fixed='top' size='large'>
    <Container>
      <Menu.Item as='a'>devCircle</Menu.Item>
      <Menu.Item>
         <Input icon='search' placeholder='Search...' />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item as='a'>Explore</Menu.Item>
        <Menu.Item as='a' active>Dashboard</Menu.Item>
        <Dropdown item icon='user circle' simple>
          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        <Menu.Item className='item'>
          <Button as='a'primary>CREATE PROJECT</Button>
        </Menu.Item>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default class HomepageLayout extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state

    return (
      <div>
        { visible ? <FixedMenu /> : null }

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            textAlign='center'
            style={{ minHeight: 100, padding: '1em 0em' }}
            vertical
          >
            <Menu pointing secondary size='large'>
              <Container>
                <Menu.Item as='a'>devCircle</Menu.Item>
                <Menu.Item>
                  <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Menu position='right'>
                  <Menu.Item as='a'>Explore</Menu.Item>
                  <Menu.Item as='a' active>Dashboard</Menu.Item>
                  <Dropdown item icon='user circle' simple>
                    <Dropdown.Menu>
                      <Dropdown.Item>Profile</Dropdown.Item>
                      <Dropdown.Item>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  <Menu.Item className='item'>
                    <Button as='a'primary>CREATE PROJECT</Button>
                  </Menu.Item>
                </Menu.Menu>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
      </div>
    )
  }
}

