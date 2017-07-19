import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Callback from './Callback'
import Login from './Login'
import Logout from './Logout'
import { authnHandler, login, logout } from '../actions'

export const LoginCallback = connect(
  (state) => ({}), //mapStateToProps
  (dispatch) => ({ handleAuthentication: bindActionCreators(authnHandler, dispatch) }) //mapDispatchToProps
)(Callback)

export const LoginPage = connect(
  (state) => ({}), //mapStateToProps
  (dispatch) => ({ login: bindActionCreators(login, dispatch) }) //mapDispatchToProps
)(Login)

export const LogoutPage = connect(
  (state) => ({}), //mapStateToProps
  (dispatch) => ({ logout: bindActionCreators(logout, dispatch) }) //mapDispatchToProps
)(Logout)
