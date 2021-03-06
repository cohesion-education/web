import React from 'react'
import PropTypes from 'prop-types'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../images/cohesion-logo.png'

const styles = {
  navbar:{
    backgroundColor: '#ffffff',
    width: '100%',
    padding:'0px 5%',
    borderRadius: '0px',
    zIndex: '999',
    marginBottom: '0px',
    WebkitTransition: 'all 0.5s ease-in-out',
    MozTransition: 'all 0.5s ease-in-out',
    OTransition: 'all 0.5s ease-in-out',
    transition: 'all 0.5s ease-in-out',
  },
  logo:{
    marginTop:'10px',
    height: '4.5em',
  },
  navLinks:{
    padding:'0',
    fontSize:'15px',
    margin:'0px 0px 5px 0px',
    paddingTop:'20px',
    paddingBottom:'10px',
    lineHeight:'20px',
    color:'#337ab7',
    textDecoration:'none',
    '&:hover':{
      backgroundColor: '#ffffff !important',
      color: '#5d9cec !important',
    }
  },
  registerButton:{
    backgroundColor: 'transparent !important',
    border: '2px solid #5d9cec !important',
    borderRadius: '50px',
    letterSpacing: '0.6px',
    marginTop:'20px',
    padding:'0px',
  },
  navCta:{
    marginTop:'15px',
    backgroundColor:'#5d9cec !important',
  },
}

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  static propTypes = {
    login: PropTypes.func.isRequired
  }

  handleLogin(e){
    e.preventDefault()
    this.props.login()
  }

  render (){
    return(
      <Navbar fluid collapseOnSelect style={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} alt='Cohesion Education' style={styles.logo} />
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text pullRight>
            <Link
              to="/register"
              style={styles.navCta}
              onClick={this.handleLogin}
              className='btn btn-primary'>
              Try for Free
            </Link>
          </Navbar.Text>
          <Nav pullRight>
            <NavItem href='#features' style={styles.navLinks}>Features</NavItem>
            <NavItem href='#pricing' style={styles.navLinks}>Plans</NavItem>
            <NavItem href="/login" style={styles.navLinks} onClick={this.handleLogin}>Login</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
