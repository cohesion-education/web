import React from 'react'
import { Button, Navbar, Nav } from 'react-bootstrap'
import Auth from '../utils/Auth'
import logo from '../images/cohesion-logo.png'
import defaultAvatar from '../images/default-avatar.png'

const styles = {
  nav:{
    backgroundColor: '#e2e2e2',
    borderColor: '#cecece',
  },
  logo:{
    height:'4.5em',
  },
  navLinks:{
    marginTop: '24px',
    fontSize: '1.2em',
    marginRight: '5px',
  },
  profilePicture:{
    border: '2px solid #edf0f0',
    height: '60px',
    width: '60px',
    cursor:'pointer',
  }
}

class DashboardTopBar extends React.Component {

  constructor(props) {
    super(props)

    this.auth = new Auth()

    this.state = {
      profilePicture:defaultAvatar
    }
  }

  componentDidMount() {
    this.auth.getProfile((err, profile) => {
      if(err){
        console.log(`failed to get profile: ${err}`)
      }else{
        let nextState = {
          profilePicture:profile.picture
        }

        this.setState(nextState)
      }
    })
  }

  render (){
    return(
      <Navbar fluid style={styles.nav} fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} alt='Cohesion Education' style={styles.logo}/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <Navbar.Text>
            <Navbar.Link href="/profile">
              <img src={this.state.profilePicture} alt="user-img" className="img-circle" style={styles.profilePicture}/>
            </Navbar.Link>
          </Navbar.Text>
          <Button href="/logout" bsStyle="primary" style={styles.navLinks}>Logout</Button>
        </Nav>
      </Navbar>
    )
  }
}

export default DashboardTopBar
