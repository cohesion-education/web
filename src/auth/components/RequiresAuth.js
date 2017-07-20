import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'
import { isAuthenticated, requestUserInfo } from '../actions'

const RequiresAuth = (ComposedComponent) => {
  class RequiresAuth extends React.Component {
    static propTypes = {
      requestUserInfo: PropTypes.func.isRequired,
      userinfo: PropTypes.object
    }

    componentWillMount(){
      if(this.props.userinfo !== undefined){
        this.props.requestUserInfo()
      }
    }

    render() {
      return isAuthenticated() ?
      (
        <ComposedComponent />
      ) :
      (
        <Redirect to='/login'/>
      )
    }
  }

  return connect(
    (state) => ({userinfo:state.userinfo}),  //mapStateToProps
    (dispatch) => ({ requestUserInfo: bindActionCreators(requestUserInfo, dispatch) }) //mapDispatchToProps
  )(RequiresAuth)
}

export default RequiresAuth
