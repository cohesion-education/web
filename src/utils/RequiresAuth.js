import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { receiveProfile } from '../actions'
import Auth from './Auth'

const RequiresAuth = (config, ComposedComponent) => {
  class RequiresAuth extends React.Component {

    constructor(props){
      super(props)
      this.auth = new Auth(config)

      this.state = {
        profile:{}
      }
    }

    componentWillMount(){
      if(!this.auth.isAuthenticated()){
        return
      }

      this.auth.getProfile((err, profile) => {
        if(err){
          console.log(`Failed to get profile: ${err}`)
          return
        }

        console.log(`profile loaded: ${JSON.stringify(profile)}`)
        this.props.dispatch(receiveProfile(profile))
      })
    }

    render() {
      return this.auth.isAuthenticated() ?
      (
        <ComposedComponent config={config} />
      ) :
      (
        <Redirect to='/login'/>
      )
    }
  }

  return connect((state) => state)(RequiresAuth)
}


export default RequiresAuth
