import React from 'react'
import ErrorPage from './ErrorPage'
import { Link } from 'react-router-dom'


export default class PageNotFound extends React.Component {

  render(){
    return(
      <ErrorPage>
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
      </ErrorPage>
    )
  }
}
