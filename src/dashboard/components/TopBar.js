import React from 'react'
import { connect } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../images/cohesion-logo.png'
import defaultAvatar from '../../images/default-avatar.png'
import Profile from '../../types/Profile'

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

class TopBar extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    error: PropTypes.object
  }

  static defaultProps =  {
    profile: new Profile()
  }

  render (){
    const { profile } = this.props
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
                <img
                  src={profile.picture ? profile.picture : defaultAvatar} 
                  alt="user-img"
                  className="img-circle"
                  style={styles.profilePicture}/>
              </Link>
            </Navbar.Text>
            <Link to="/logout" className='btn btn-primary' style={styles.navLinks}>Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connect(
  (state) => ({
    //mapStateToProps
    profile: state.profile
  }),
  (dispatch) => ({
    //mapDispatchToProps
  })
)(TopBar)
