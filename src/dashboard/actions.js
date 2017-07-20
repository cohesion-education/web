import Profile from '../types/Profile'
import { getIDToken } from '../auth/actions'
import { RECEIVE_PROFILE, RECEIVE_PROFILE_FAILURE } from './constants'

export const receiveProfile = (profile) => {
  return {
    type: RECEIVE_PROFILE,
    profile: profile,
    receivedAt: Date.now()
  }
}

export const handleProfileUpdate = (profile, key, val) => {
  console.log(`updating profile with ${key}=${val}`)
  let updated = Object.assign(new Profile(), profile)

  if(key.indexOf('.') !== -1){
    let splitKey = key.split('.')
    updated[splitKey[0]][splitKey[1]] = val
  }else{
    updated[key] = val
  }

  updated.validate()
  console.log(`updated profile: ${JSON.stringify(updated)}`)

  return receiveProfile(updated)
}

export const handlePreferencesUpdate = (profile, key, val) => {
  console.log(`updating profile preferences with ${key}=${val}`)
  let updated = Object.assign(new Profile(), profile)
  profile.preferences[key] = val

  console.log(`updated profile: ${JSON.stringify(updated)}`)

  return receiveProfile(updated)
}

export const receiveProfileFailure = (error) => {
  return {
    type: RECEIVE_PROFILE_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
}

export function fetchProfile() {
  const token = getIDToken()
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return (dispatch) => {
    // console.log('fetching profile')
    return fetch(`${window.config.api_base}/api/profile`, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          const profile = Object.assign(new Profile(), {...json})
          profile.validate()
          dispatch(receiveProfile(profile))
        }
      })
      .catch(error => {
        console.log(`error: ${error}`)
        dispatch(receiveProfileFailure(error))
      })
  }
}

export const saveProfile = (p) => {
  return (dispatch) => {
    let profile = Object.assign(new Profile(), p)
    if(!profile.validate()){
      profile.errorMessage = 'Oops! Looks like you\'re missing some information'
      dispatch(receiveProfile(profile))
      return
    }

    const token = getIDToken()
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile)
    }

    fetch(`${window.config.api_base}/api/profile`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to update profile: ${json.error}`
        dispatch(receiveProfile(json))
        return
      }

      json.successMessage = 'Your profile has been updated'
      dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while trying to update your profile: ${err}`
      dispatch(receiveProfile(profile))
    })
  }
}

export const savePreferences = (profile) => {
  return (dispatch) => {
    const prefs = {...profile.preferences}
    const token = getIDToken()
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prefs)
    }
    console.log(`prefs body: ${opts.body}`)

    fetch(`${window.config.api_base}/api/profile/preferences`, opts)
    .then(response => response.json())
    .then(json => {
      console.log(JSON.stringify(json))
      if(json.error){
        json.errorMessage = `Failed to update profile: ${json.error}`
        dispatch(receiveProfile(json))
        return
      }

      json.successMessage = 'Thank you! Your preferences have been updated'
      dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while updating your profile: ${err}`
      dispatch(receiveProfile(profile))
      return
    })
  }
}
