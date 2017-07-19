import { getIDToken } from '../auth/actions'

//TODO - refactor with dispatch
export const fetchProfile = (cb) => {
  let token = getIDToken()

  fetch(`${window.config.api_base}/api/profile`, {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
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

//TODO - refactor with dispatch
export const updatePreferences = (prefs, cb) => {
  let token = getIDToken()

  try{
    fetch(`${window.config.api_base}/api/profile/preferences`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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

//TODO - refactor with dispatch
export const updateProfile = (profile, cb) => {
  let token = getIDToken()

  try{
    fetch(`${window.config.api_base}/api/profile`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
