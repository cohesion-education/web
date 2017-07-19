import React from 'react'
import PropTypes from 'prop-types'

export default class Logout extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  componentWillMount(){
    this.props.logout()
  }

  render (){
    return (
      <div>Logging out</div>
    )
  }
}
