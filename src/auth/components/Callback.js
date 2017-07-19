import React from 'react'
import PropTypes from 'prop-types'

export default class Callback extends React.Component {
  static propTypes = {
    handleAuthentication: PropTypes.func.isRequired
  }

  componentDidMount(){
    // console.log('Callback.componentDidMount')
    // console.log(`this.props: ${JSON.stringify(this.props)}`)
    // console.log(`location.hash: ${JSON.stringify(window.location)}`)
    // console.log(`location.hash: ${window.location.hash}`)
    // this.handleAuthentication(this.props)
    this.props.handleAuthentication()
  }

  render (){
    return (
      <div>Please wait</div>
    )
  }
}
