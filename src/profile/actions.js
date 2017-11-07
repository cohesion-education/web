import fetch from 'isomorphic-fetch'
import Profile from '../types/Profile'
import { getIDToken } from '../auth/actions'
import * as constants from './constants'

export const invalidateProfile = () => {
  return {
    type: constants.INVALIDATE_PROFILE,
  }
}

export const requestProfile = () => {
  return {
    type: constants.REQUEST_PROFILE,
  }
}

export const requestStudents = () => {
  return {
    type: constants.REQUEST_STUDENTS,
  }
}

export const receiveProfile = (profile) => {
  return {
    type: constants.RECEIVE_PROFILE,
    profile: Object.assign(new Profile(), {...profile}),
    receivedAt: Date.now()
  }
}

export const receiveProfileFailure = (error) => {
  return {
    type: constants.RECEIVE_PROFILE_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
}

export const receiveStudents = (students) => {
  return {
    type: constants.RECEIVE_STUDENTS,
    students: students
  }
}

export const handleProfileUpdate = (profile, key, val) => {
  let { validationErrors, validationState, ...remainingProps } = profile
  let updated = Object.assign(new Profile(), {...remainingProps})

  if(key.indexOf('.') !== -1){
    let splitKey = key.split('.')
    updated[splitKey[0]][splitKey[1]] = val
  }else{
    updated[key] = val
  }

  updated.validate()

  return receiveProfile(updated)
}

export const handlePreferencesUpdate = (profile, key, val) => {
  let { validationErrors, validationState, ...remainingProps } = profile
  let updated = Object.assign(new Profile(), {...remainingProps})
  updated.preferences[key] = val


  return receiveProfile(updated)
}


function shouldFetchProfile(state) {
  const profile = state.profile

  if(!profile){
    return true
  }else if(profile.isFetching){
    return false
  }else if(!profile.id || profile.id === -1){
    return true
  }

  return profile.didInvalidate
}

function shouldFetchStudents(state) {
  if(shouldFetchProfile(state)){
    return true
  }

  const students = state.profile.students
  if(!students){
    return true
  }else if(state.profile.isFetchingStudents){
    return false
  }else if(students.length === 0){
    return true
  }

  return false
}

export function fetchProfileIfNeeded(){
  return (dispatch, getState) => {
    if(shouldFetchProfile(getState())){
      return dispatch(fetchProfile())
    }

    return dispatch(receiveProfile(getState().profile))
  }
}

export function fetchStudentsIfNeeded(){
  return (dispatch, getState) => {
    if(shouldFetchStudents(getState())){
      return dispatch(fetchStudents())
    }

    return dispatch(receiveStudents(getState().profile.students))
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
    dispatch(requestProfile())
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
        console.log(`error fetching profile: ${error}\nuri: ${window.config.api_base}/api/profile\nopts: ${JSON.stringify(opts)}`)
        dispatch(receiveProfileFailure(error))
      })
  }
}

export function fetchStudents() {
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/profile/students`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return (dispatch) => {
    dispatch(requestStudents())
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          console.log(`fetch students response: ${JSON.stringify(json)}`)
          const profile = Object.assign(new Profile(), {...json})
          // console.log(`fetch students response: ${JSON.stringify(profile)}`)
          dispatch(receiveStudents(profile.students))
        }
      })
      .catch(error => {
        console.log(`error fetching students: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        dispatch(receiveProfileFailure(error))
      })
  }
}

export const saveProfile = (p) => {
  return (dispatch) => {
    const { successMessage, errorMessage, validationErrors, validationState, ...remainingProps } = p
    const profile = Object.assign(new Profile(), {...remainingProps})
    if(!profile.validate()){
      profile.errorMessage = 'Oops! Looks like you\'re missing some information'
      return dispatch(receiveProfile(profile))
    }

    const token = getIDToken()
    const opts = {
      method: 'put',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile)
    }

    return fetch(`${window.config.api_base}/api/profile`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to update profile: ${json.error}`
        return dispatch(receiveProfile(json))
      }

      json.successMessage = 'Your profile has been updated'
      dispatch(invalidateProfile())
      return dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while trying to update your profile: ${err}`
      console.log(`error:${profile.errorMessage}\nuri: ${window.config.api_base}/api/profile\nopts: ${JSON.stringify(opts)}`)
      return dispatch(receiveProfile(profile))
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

    return fetch(`${window.config.api_base}/api/profile/preferences`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to update profile: ${json.error}`
        dispatch(receiveProfile(json))
        return
      }

      json.successMessage = 'Thank you! Your preferences have been updated'
      dispatch(invalidateProfile())
      dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while updating your profile: ${err}`
      dispatch(receiveProfile(profile))
      return
    })
  }
}

export const saveStudents = (students) => {
  return (dispatch) => {
    const token = getIDToken()
    const apiURL = `${window.config.api_base}/api/profile/students`
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(students)
    }

    return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to save students: ${json.error}`
        return dispatch(receiveStudents(json))
      }

      json.successMessage = 'Your students have been saved'
      dispatch(invalidateProfile())
      return dispatch(receiveStudents(json))
    })
    .catch(err => {
      students.errorMessage = `An error occurred while trying to save your student list: ${err}`
      console.log(`error:${students.errorMessage}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return dispatch(receiveStudents(students))
    })
  }
}

export const savePaymentDetails = (payment_details) => {
  return (dispatch) => {
    const apiURL = `${window.config.api_base}/api/profile/paymentdetails`
    const token = getIDToken()
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payment_details)
    }

    return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to save payment details: ${json.error}`
        //TODO - anything need to be dispatched?
        return json
      }

      json.successMessage = 'Successfully saved payment details'

      //TODO - anything need to be dispatched?
      return json
    })
    .catch(err => {
      payment_details.errorMessage = `An error occurred while trying to save your payment details: ${err}`
      console.log(`error:${payment_details.errorMessage}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      //TODO - anything need to be dispatched?
      return payment_details
    })
  }
}
