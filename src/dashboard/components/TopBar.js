import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import logo from '../../images/cohesion-logo.png'
import defaultAvatar from '../../images/default-avatar.png'
import Profile from '../../types/Profile'
import * as profileActions from '../../profile/actions'

const styles = {
  nav:{
    backgroundColor: '#e2e2e2',
    borderColor: '#cecece',
  },
  trialPeriodNavbar:{
    backgroundColor: '#feffc7',
    borderColor: '#cecece',
    marginTop: '-20px',
    fontWeight: 'bold',
    fontSize: '1.2em',
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

export class TopBar extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    error: PropTypes.object,
    fetchProfileIfNeeded: PropTypes.func.isRequired,
  }

  static defaultProps =  {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchProfileIfNeeded()
  }

  render (){
    const profile = Object.assign(new Profile(), {...this.props.profile})
    return(
      <div>
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
        { profile.in_trial &&
          <Navbar fluid style={styles.trialPeriodNavbar}>
            <Navbar.Header>
              <Navbar.Brand>
                Your free trial expires in {profile.days_remaining_in_trial} day{profile.days_remaining_in_trial > 1 ? 's' : ''}
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
        }
      </div>
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
    fetchProfileIfNeeded: bindActionCreators(profileActions.fetchProfileIfNeeded, dispatch),
  })
)(TopBar)
