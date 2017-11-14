import auth0 from 'auth0-js'
import history from '../history'
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST, LOGOUT_SUCCESS, RECEIVE_USER_INFO } from './constants'
import * as profileActions from '../profile/actions'

const config = window.config ? window.config : {
  auth0_domain:'cohesioned.auth0.com',
  auth0_client_id: 'abc123',
  callback_url: 'http://localhost:3000/callback',
  logout_return_to: 'http://localhost:3000/'
}

const webAuth = new auth0.WebAuth({
  domain: config.auth0_domain,
  clientID: config.auth0_client_id,
  redirectUri: config.callback_url,
  audience: `https://${config.auth0_domain}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid profile email' /* https://auth0.com/docs/scopes/current, https://auth0.com/docs/scopes */
})

export function login(from = '/dashboard') {
  if(isAuthenticated()){
    history.replace(from !== '' ? from : '/dashboard')
    return
  }

  // dispatch(requestLogin(from))
  let redirectUri = (typeof from === 'string' && from !== '')
  ? `${config.callback_url}?from=${encodeURI(from)}`
  : config.callback_url
  console.log(`redirectUri: ${redirectUri}`)
  webAuth.authorize({
    redirectUri: redirectUri
  })
}

export function logout() {
  return function (dispatch) {
    // Clear access token and ID token from local storage
    localStorage.removeItem('auth_result')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('expires_in')
    dispatch(receiveLogout())
    webAuth.logout({
      returnTo: config.logout_return_to
    })
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

export const isAdmin = () => {
  try{
    if(!isAuthenticated() || getIDToken() === ''){
      return false
    }

    let authResult = JSON.parse(getAuthResult())
    let email = authResult.idTokenPayload.email ? authResult.idTokenPayload.email : ''
    return email.endsWith('@cohesioned.io')
  }catch(e){
    return false
  }
}

export const getAccessToken = () => {
  let token = localStorage.getItem('access_token') || null
  if(!token) {
    throw new Error('Not authenticated')
  }

  return token
}

export const getIDToken = () => {
  let token = localStorage.getItem('id_token') || null
  if(!token) {
    throw new Error('Not authenticated')
  }

  return token
}

export const getAuthResult = () => {
  let authResult = localStorage.getItem('auth_result') || null
  if(!authResult) {
    throw new Error('Not authenticated')
  }

  return authResult
}


export const receiveAuthnSuccess = (authResult) => {
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

export function authnHandler(from) {
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

        dispatch(getOrCreateProfile(authResult.idTokenPayload)).then((profile) => {
          if(profile.error){
            alert(profile.error)
            console.log(`failed to get or create profile: ${profile.error}`)
            //TODO - direct user to error page?
            return
          }

          dispatch(profileActions.receiveProfile(profile))
          dispatch(receiveAuthnSuccess(currentUser))

          history.replace(from ? from : '/dashboard')

          //TODO - what does user info have that we didn't already have before?
          webAuth.client.userInfo(authResult.accessToken, (err, userinfo) => {
            console.log(`received userinfo: ${userinfo}`)
            dispatch(receiveUserInfo(userinfo, err))
          })
        })
      })

      return
    }

    console.log(`unable to find access_token, id_token, or error. Assuming invalid authn attempt: ${window.location.hash}`)
    dispatch(receiveAuthnFailure('Invalid authentication attempt.'))
  }
}

export function getOrCreateProfile(profile) {
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/profile/get_or_create`
  const opts = {
    method: 'post',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile)
  }

  return (dispatch) => {
    console.log(`get_or_create profile ${JSON.stringify(profile)}`)
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        console.log(`get_or_create profile result: ${JSON.stringify(json)}`)
        return json
      })
      .catch(error => {
        console.log(`error get_or_create profile: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        profile.error = error
        return profile
      })
  }
}


export const requestUserInfo = () => {
  const accessToken = getAccessToken()

  return function (dispatch) {
    webAuth.client.userInfo(accessToken, (err, userinfo) => {
      dispatch(receiveUserInfo(userinfo, err))
    })
  }
}
