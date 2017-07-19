import { connect } from 'react-redux'
import TopBar from './TopBar'

export const DashboardTopNav = connect(
  (state) => ({userinfo: state.userinfo}), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(TopBar)
