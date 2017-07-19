import React from 'react'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  componentWillMount(){
    this.props.login()
  }

  render (){
    return (
      <div>Logging in</div>
    )
  }
}
