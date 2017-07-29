import React from 'react'
import { Route, Redirect } from 'react-router'
import { isAuthenticated, isAdmin } from '../actions'

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    isAuthenticated() ? (
      isAdmin() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/403',
          state: { from: props.location }
        }}/>
      )
    ) :
    (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )}
  />
)

export default AdminRoute
