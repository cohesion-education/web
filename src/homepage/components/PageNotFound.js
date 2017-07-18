import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import '../../css/fonts.css'
import '../../css/font-awesome.css'
import '../../css/homepage.css'
import '../../css/pages.css'
import '../../css/icons.css'

export default class PageNotFound extends React.Component {

  render(){
    return(
      <div>
        <Header />
        <div className="wrapper-page">
          <div className="ex-page-content text-center">
            <div className="text-error">
              <span className="text-primary">4</span><i className="ti-face-sad text-pink"></i><span className="text-info">4</span>
            </div>
            <h2>Whoops! Page not found</h2>
            <br />
            <p className="text-muted">
              This page cannot found or is missing.
            </p>
            <p className="text-muted">
              Use the navigation above or the button below to get back and track.
            </p>
            <br />
            <Link to="/" className="btn btn-default waves-effect waves-light"> Return Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
