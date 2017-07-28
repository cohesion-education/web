import React from 'react'
import { Route, Redirect } from 'react-router'
import { isAdmin } from '../actions'

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAdmin() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/403',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default AdminRoute
