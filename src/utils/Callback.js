import React from 'react'
import Auth from './Auth'

export default class Callback extends React.Component {
  constructor(props){
    super(props)
    this.auth = new Auth()
    this.handleAuthentication = this.handleAuthentication.bind(this)
  }

  handleAuthentication(){
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.auth.handleAuthentication()
    }
  }

  componentDidMount(){
    // console.log('Callback.componentDidMount')
    // console.log(`this.props: ${JSON.stringify(this.props)}`)
    // console.log(`location.hash: ${JSON.stringify(window.location)}`)
    // console.log(`location.hash: ${window.location.hash}`)
    this.handleAuthentication(this.props)
  }

  render (){
    return (
      <div>Loading...</div>
    )
  }
}
