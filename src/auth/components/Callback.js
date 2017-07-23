import React from 'react'
import PropTypes from 'prop-types'

export default class Callback extends React.Component {
  static propTypes = {
    handleAuthentication: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired
  }

  componentDidMount(){
    console.log(`this.props.location.search: ${this.props.location.search}`)
    let from = this.props.location.search
    if(from !== ''){
      from = from.replace('?from=', '')
    }
    this.props.handleAuthentication(from)
  }

  render (){
    return (
      <div>Please wait</div>
    )
  }
}
