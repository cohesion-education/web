import Auth from '../utils/Auth'

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'
const auth = new Auth()


export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile:profile,
    receivedAt: Date.now()
  }
}

export function fetchProfile(cb){
  fetch(`${window.config.api_base}/api/profile`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${auth.getIDToken()}`,
    }
  })
  .then(response => response.json())
  .then(json => {
    cb(json, null)
  })
  .catch(function(err) {
    cb(null, `an error occurred while fetching /api/profile: ${err}`)
  })
}

export function updatePreferences(prefs, cb){
  try{
    fetch(`${window.config.api_base}/api/profile/preferences`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${auth.getIDToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prefs)
    })
    .then(response => {
      response.json()
      cb(null)
    })
    .catch(err => {
      cb(`An error occurred while updating your profile: ${err}`)
    })
  }catch(e){
    cb(`failed to get access token - you might not be logged in: ${e}`)
  }
}

export function updateProfile(profile, cb){
  try{
    fetch(`${window.config.api_base}/api/profile`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${auth.getIDToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile)
    })
    .then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json))
      if(json.error){
        cb(`Failed to update profile: ${json.error}`)
        return
      }

      cb(null)
    })
    .catch(err => {
      cb(`An error occurred while trying to update your profile: ${err}`)
    })
  }catch(e){
    cb(`failed to get access token - you might not be logged in: ${e}`)
  }
}
