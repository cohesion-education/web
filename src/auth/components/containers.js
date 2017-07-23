import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Callback from './Callback'
import Login from './Login'
import Logout from './Logout'
import * as actions from '../actions'

export const LoginCallback = connect(
  (state) => ({
    location: state.router.location
  }), //mapStateToProps
  (dispatch) => ({ handleAuthentication: bindActionCreators(actions.authnHandler, dispatch) }) //mapDispatchToProps
)(Callback)

export const LoginPage = connect(
  (state) => {
    let from = ''
    if(state.router.location.state !== undefined){
      // console.log('setting "from" using state.router.location.state.from.pathname')
      from = state.router.location.state.from.pathname
    }

    // console.log(`from: ${from}`)
    return {
      from: from
    }
  }, //mapStateToProps
  (dispatch) => ({ login: actions.login }) //mapDispatchToProps
)(Login)

export const LogoutPage = connect(
  (state) => ({}), //mapStateToProps
  (dispatch) => ({ logout: bindActionCreators(actions.logout, dispatch) }) //mapDispatchToProps
)(Logout)
