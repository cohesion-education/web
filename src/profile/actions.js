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

export const requestPaymentDetails = () => {
  return {
    type: constants.REQUEST_PAYMENT_DETAILS,
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

export const receivePaymentDetails = (payment_details) => {
  return {
    type: constants.RECEIVE_PAYMENT_DETAILS,
    profile: Object.assign({}, {...payment_details})
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

export function fetchPaymentDetails(){
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/profile/paymentdetails`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return (dispatch) => {
    // dispatch(requestPaymentDetails())
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(payment_details => {
        if(payment_details.error){
          payment_details.errorMessage = `An unexpected error occurred when fetching your payment details: ${payment_details.error}`
        }

        const card = payment_details.token ? payment_details.token.card : {}
        payment_details.card_id = card.id
        payment_details.name = card.name
        payment_details.expiry_month = card.exp_month
        payment_details.expiry_year = card.exp_year
        payment_details.address_line1 = card.address_line1
        payment_details.address_line2 = card.address_line2
        payment_details.address_city = card.address_city
        payment_details.address_state = card.address_state
        payment_details.address_zip = card.address_zip
        payment_details.last4 = card.last4

        return payment_details
      })
      .catch(error => {
        console.log(`error fetching paymentdetails: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        return {errorMessage:`Failed to fetch your payment details: ${error}`}
      })
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
    .then(payment_details => {
      if(payment_details.error){
        payment_details.errorMessage = `Failed to save payment details: ${payment_details.error}`
        return payment_details
      }

      payment_details.successMessage = 'Successfully saved payment details'
      return payment_details
    })
    .catch(err => {
      payment_details.errorMessage = `An error occurred while trying to save your payment details: ${err}`
      console.log(`error:${payment_details.errorMessage}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return payment_details
    })
  }
}
