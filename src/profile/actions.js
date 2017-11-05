import fetch from 'isomorphic-fetch'
import Profile from '../types/Profile'
import Student from '../types/Student'
import { getIDToken } from '../auth/actions'
import * as constants from './constants'

export const receiveProfile = (profile) => {
  return {
    type: constants.RECEIVE_PROFILE,
    profile: Object.assign(new Profile(), {...profile}),
    receivedAt: Date.now()
  }
}

export const receiveStudents = (profile) => {
  return {
    type: constants.RECEIVE_STUDENTS,
    profile: Object.assign(new Profile(), {...profile}),
    receivedAt: Date.now()
  }
}

export const handleProfileUpdate = (profile, key, val) => {
  // console.log(`updating profile with ${key}=${val}`)
  let { validationErrors, validationState, ...remainingProps } = profile
  let updated = Object.assign(new Profile(), {...remainingProps})

  if(key.indexOf('.') !== -1){
    let splitKey = key.split('.')
    updated[splitKey[0]][splitKey[1]] = val
  }else{
    updated[key] = val
  }

  updated.validate()
  // console.log(`updated profile: ${JSON.stringify(updated)}`)

  return receiveProfile(updated)
}

export const handlePreferencesUpdate = (profile, key, val) => {
  let { validationErrors, validationState, ...remainingProps } = profile
  let updated = Object.assign(new Profile(), {...remainingProps})
  updated.preferences[key] = val


  return receiveProfile(updated)
}

export const handleStudentAdd = (profile) => {
  const { profileValidationErrors, profileValidationState, students, ...remainingProfileProps } = profile
  const nextStudents = (students !== null ? students.slice() : [])
  nextStudents.push(new Student('', '', '', nextStudents.length))

  const nextProfile = Object.assign(new Profile(), {...remainingProfileProps}, {students:nextStudents})
  return receiveProfile(nextProfile)
}

export const handleStudentUpdate = (profile, existingStudent, key, val) => {
  let { profileValidationErrors, profileValidationState, students, ...remainingProfileProps } = profile
  let nextStudents = students.map(student => {
    if (student.id === existingStudent.id) {
      let { studentValidationErrors, studentValidationState, ...remainingStudentProps } = student
      let updatedStudent = Object.assign(new Student(), {...remainingStudentProps})
      updatedStudent[key]=val
      return updatedStudent
    } else {
      return student
    }
  })

  let nextProfile = Object.assign(new Profile(), {...remainingProfileProps}, {students:nextStudents})
  return receiveProfile(nextProfile)
}

export const handleStudentRemove = (profile, studentToRemove) => {
  let { profileValidationErrors, profileValidationState, students, ...remainingProfileProps } = profile
  let nextStudents = students.filter(student => student.name !== studentToRemove.name)
  let nextProfile = Object.assign(new Profile(), {...remainingProfileProps}, {students:nextStudents})
  return receiveProfile(nextProfile)
}

export const receiveProfileFailure = (error) => {
  return {
    type: constants.RECEIVE_PROFILE_FAILURE,
    error: error,
    receivedAt: Date.now()
  }
}

function shouldFetchProfile(state) {
  return state.profile === undefined
}

function shouldFetchStudents(state) {
  return state.profile.students.length === 0 
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

  return (dispatch, getState) => {
    if(!shouldFetchProfile(getState())){
      return dispatch(receiveStudents(getState().profile))
    }

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

  return (dispatch, getState) => {
    if(!shouldFetchStudents(getState())){
      return dispatch(receiveStudents(getState().profile))
    }

    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          console.log(`fetch students response: ${JSON.stringify(json)}`)
          const profile = Object.assign(new Profile(), {...json})
          // console.log(`fetch students response: ${JSON.stringify(profile)}`)
          dispatch(receiveStudents(profile))
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
      dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while updating your profile: ${err}`
      dispatch(receiveProfile(profile))
      return
    })
  }
}

export const saveStudents = (profile) => {
  return (dispatch) => {
    const { students } = profile

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
        return dispatch(receiveProfile(json))
      }

      json.successMessage = 'Your students have been saved'
      return dispatch(receiveProfile(json))
    })
    .catch(err => {
      profile.errorMessage = `An error occurred while trying to save your student list: ${err}`
      console.log(`error:${profile.errorMessage}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return dispatch(receiveProfile(profile))
    })
  }
}
