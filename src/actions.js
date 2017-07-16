import fetch from 'isomorphic-fetch'
import Auth from './utils/Auth'

export const REQUEST_HOMEPAGE = 'REQUEST_HOMEPAGE'
export const RECEIVE_HOMEPAGE = 'RECEIVE_HOMEPAGE'
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
const auth = new Auth()


function requestHomepage() {
  return {
    type: REQUEST_HOMEPAGE
  }
}

function receiveHomepage(json) {
  return {
    type: RECEIVE_HOMEPAGE,
    header:json.header,
    features:json.features,
    testimonials:json.testimonials,
    pricing:json.pricing,
    receivedAt: Date.now()
  }
}

export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile:profile,
    receivedAt: Date.now()
  }
}

export function fetchHomepage() {
  return function (dispatch) {
    dispatch(requestHomepage())

    return fetch(`${window.location.api_base}/api/homepage`)
      .then(response => {
        return response.json()
      })
      .then(json =>
        dispatch(receiveHomepage(json))
      ).catch(function(err) {
        console.log(`an error occurred while fetching /api/homepage: ${err}`)
      })
  }
}

export function fetchPreferences(cb){
  return fetch(`${window.config.api_base}/api/profile`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${auth.getIDToken()}`,
    }
  })
  .then(response => response.json())
  .then(json => {
    cb(json)
  })
  .catch(function(err) {
    console.log(`an error occurred while fetching /api/profile: ${err}`)
  })
}

export function updatePreferences(prefs){
  try{
    return fetch(`${window.config.api_base}/api/profile/preferences`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${auth.getIDToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prefs)
    })
    .then(response => response.json())
    .catch(err => {
      console.log(`an error occurred while fetching /api/profile/preferences: ${err}`)
    })
  }catch(e){
    console.log(`failed to get access token: ${e}`)
    //TODO - probably better to redirect user somewhere in this scenario
    alert(`You might not be logged in`)
  }
}
