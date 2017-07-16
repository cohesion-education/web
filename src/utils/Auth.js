import auth0 from 'auth0-js'
import history from '../history'

export default class Auth {

  constructor(props) {
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.getProfile = this.getProfile.bind(this)

    this.webAuth = new auth0.WebAuth({
      domain: window.config.auth0_domain,
      clientID: window.config.auth0_client_id,
      redirectUri:window.config.callback_url,
      audience: `https://${window.config.auth0_domain}/userinfo`,
      responseType: 'token id_token',
      scope: 'openid profile email' /* https://auth0.com/docs/scopes/current, https://auth0.com/docs/scopes */
    })
  }

  login(e) {
    if(e){
      e.preventDefault()
    }

    this.webAuth.authorize()
  }

  handleAuthentication() {
    this.webAuth.parseHash((err, authResult) => {
      if (err) {
        console.log(`an error occurred when parsing the access token: ${JSON.stringify(err)}`)
        alert(`Unexpected Error: ${err.error}. Please contact support if the issue persists`)
      }else if (authResult && authResult.accessToken && authResult.idToken) {
        console.log(authResult)
        console.log(JSON.stringify(authResult))
        console.log(`app_metadata: ${authResult.app_metadata}`)
        this.setSession(authResult)
        history.replace('/dashboard')
      }
    })
  }


  isAuthenticated() {
    if(!localStorage.getItem('expires_at')){
      return false
    }
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
      localStorage.setItem('authResult', JSON.stringify(authResult))
      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      localStorage.setItem('expires_in', authResult.expiresIn)
    }
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }
    return accessToken
  }

  getIDToken() {
    const token = localStorage.getItem('id_token')
    if (!token) {
      throw new Error('No id token found')
    }
    return token
  }

  getProfile(cb) {
    try{
      let accessToken = this.getAccessToken()
      this.webAuth.client.userInfo(accessToken, (err, profile) => {
        // if (profile) {
        //   this.userProfile = profile
        // }
        cb(err, profile)
      })
    }catch(err){
      cb(err, null)
    }
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // this.userProfile = null

    history.replace('/')
  }
}
