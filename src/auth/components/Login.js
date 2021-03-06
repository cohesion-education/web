import React from 'react'
import PropTypes from 'prop-types'

export default class Login extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    from: PropTypes.string
  }

  componentWillMount(){
    this.props.login(this.props.from)
  }

  render (){
    return (
      <div>Logging in</div>
    )
  }
}
