import auth0 from 'auth0-js'
import history from '../history'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, RECEIVE_USER_INFO } from './constants'

const config = window.config ? window.config : {
  auth0_domain:'cohesioned.auth0.com',
  auth0_client_id: 'abc123',
  callback_url: 'http://localhost:3000/callback'
}

const webAuth = new auth0.WebAuth({
  domain: config.auth0_domain,
  clientID: config.auth0_client_id,
  redirectUri: config.callback_url,
  audience: `https://${config.auth0_domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile email' /* https://auth0.com/docs/scopes/current, https://auth0.com/docs/scopes */
})

export function login() {
  return function (dispatch) {
    if(isAuthenticated()){
      history.replace('/dashboard')
      return
    }
    
    dispatch(requestLogin())
    webAuth.authorize()
  }
}

export function logout() {
  return function (dispatch) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    dispatch(receiveLogout())
  }
}

export const isAuthenticated = () => {
  if(!localStorage.getItem('expires_at')){
    return false
  }
  // Check whether the current time is past the access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export const getAccessToken = () => {
  let token = localStorage.getItem('access_token') || null
  if(!token) {
    throw 'Not authenticated'
  }

  return token
}

export const getIDToken = () => {
  let token = localStorage.getItem('id_token') || null
  if(!token) {
    throw 'Not authenticated'
  }

  return token
}


export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
    webAuth: webAuth,
    receivedAt: Date.now()
  }
}

export const receiveAuthnSuccess = (authResult) => {
  //TODO - add support for redirecting based on path param
  history.replace('/dashboard')
  return {
    type: LOGIN_SUCCESS,
    authResult: authResult,
    receivedAt: Date.now()
  }
}

export const receiveAuthnFailure = (error) => {
  //TODO - redirect to 401?
  return {
    type: LOGIN_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
}

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
    webAuth: webAuth,
    receivedAt: Date.now()
  }
}

export const receiveLogout = () => {
  //TODO - redirect to homepage?
  history.replace('/')

  return {
    type: LOGOUT_SUCCESS,
    receivedAt: Date.now()
  }
}

export const receiveUserInfo = (userinfo, err) => {
  return {
    type: RECEIVE_USER_INFO,
    receivedAt: Date.now(),
    userinfo: userinfo,
    error: err
  }
}

export function authnHandler() {
  return function (dispatch) {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          console.log(`an error occurred when parsing the access token: ${JSON.stringify(err)}`)
          dispatch(receiveAuthnFailure(`Unexpected Error: ${err.error}. Please contact support if the issue persists`))
          return
        }

        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
        let currentUser = Object.assign({}, { ...authResult }, { expiresAt:expiresAt })

        //TODO - evaluate the need for all of this
        localStorage.setItem('auth_result', JSON.stringify(authResult))
        localStorage.setItem('access_token', authResult.accessToken)
        localStorage.setItem('id_token', authResult.idToken)
        localStorage.setItem('expires_at', expiresAt)
        localStorage.setItem('expires_in', authResult.expiresIn)

        dispatch(receiveAuthnSuccess(currentUser))
      })

      return
    }

    console.log(`unable to find access_token, id_token, or error. Assuming invalid authn attempt: ${window.location.hash}`)
    dispatch(receiveAuthnFailure('Invalid authentication attempt.'))
  }
}


export const requestUserInfo = () => {
  const accessToken = getAccessToken()

  return function (dispatch) {
    webAuth.client.userInfo(accessToken, (err, profile) => {
      dispatch(receiveUserInfo(profile, err))
    })
  }
}
