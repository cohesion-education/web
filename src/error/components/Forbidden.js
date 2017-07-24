import React from 'react'
import ErrorPage from './ErrorPage'
import { Link } from 'react-router-dom'


export default class PageNotFound extends React.Component {

  render(){
    return(
      <ErrorPage>
        <div className='text-error'>
          <span className='text-primary'>4</span>
          <i className='ti-face-sad text-pink'></i>
          <span className='text-info'>3</span>
        </div>
        <h2>Forbidden</h2>
        <br />
        <p className='text-muted'>You don't have permission to access on this server.</p>
        <br />
        <Link to="/" className="btn btn-default waves-effect waves-light"> Return Home</Link>
      </ErrorPage>
    )
  }
}
