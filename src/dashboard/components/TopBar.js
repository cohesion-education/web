import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../images/cohesion-logo.png'
import defaultAvatar from '../../images/default-avatar.png'

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

export default class TopBar extends React.Component {
  static propTypes = {
    userinfo: PropTypes.object.isRequired,
    error: PropTypes.object
  }

  static defaultProps =  {
    userinfo: { picture:defaultAvatar }
  }

  render (){
    //TODO - check for error
    // console.log(`userinfo: ${JSON.stringify(this.props.userinfo)}`)
    // console.log(`picture: ${JSON.stringify(this.props.userinfo.picture)}`)
    const { picture } = this.props.userinfo
    return(
      <Navbar fluid style={styles.nav}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} alt='Cohesion Education' style={styles.logo}/>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <Navbar.Text>
              <Link to="/profile" className='navbar-link' style={styles.navLinks}>
                <img src={picture} alt="user-img" className="img-circle" style={styles.profilePicture}/>
              </Link>
            </Navbar.Text>
            <Link to="/logout" className='btn btn-primary' style={styles.navLinks}>Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
