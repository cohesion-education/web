import React from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  render(){
    return(
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="copy col-lg-3 col-md-3">
              &copy; 2017 Cohesion Education, Inc.
            </div>
            <div className="col-lg-4 col-lg-offset-3 col-md-7">
              <ul className="nav navbar-nav">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-2">
              <ul className="social-icons">
                <li><a href="https://www.facebook.com/cohesioned/"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/cohesioned"><i className="fa fa-twitter"></i></a></li>
                <li><a href="https://www.instagram.com/cohesioneducation/"><i className="fa fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer;
