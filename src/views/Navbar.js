import React from 'react'
import Auth from '../utils/Auth'
import { Button, Navbar, Nav, NavItem } from 'react-bootstrap'
import injectSheet from 'react-jss'
import classNames from 'classnames'
import logo from '../images/cohesion-logo.png'

const auth = new Auth()

const styles = {
  navbar:{
    backgroundColor: '#ffffff',
    width: '100%',
    padding:'0px 5%',
    borderRadius: '0px',
    zIndex: '999',
    marginBottom: '0px',
    webkitTransition: 'all 0.5s ease-in-out',
    mozTransition: 'all 0.5s ease-in-out',
    oTransition: 'all 0.5s ease-in-out',
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
    marginTop:'28px',
    backgroundColor:'#5d9cec !important',
  },
}

const HomepageNavbar = ({classes}) =>

  <Navbar fluid collapseOnSelect className={classes.navbar}>
    <Navbar.Header>
      <Navbar.Brand>
        <img src={logo} alt='Cohesion Education' className={classes.logo}/>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem href='#features' className={classes.navLinks}>Features</NavItem>
        <NavItem href='#pricing' className={classes.navLinks}>Plans</NavItem>
        <NavItem href='/login' onClick={auth.login} className={classes.navLinks}>Login</NavItem>
        <Button bsStyle="primary" href='/register' onClick={auth.login} className={classes.navCta}>Try for Free</Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

export default injectSheet(styles)(HomepageNavbar)
