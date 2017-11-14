import { INVALIDATE_PROFILE, RECEIVE_PROFILE, RECEIVE_STUDENTS, REQUEST_PROFILE, REQUEST_STUDENTS } from './constants'
import { RECEIVE_USER_INFO } from '../auth/constants'
// import Profile from '../types/Profile'

export const userinfoReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER_INFO:
      // console.log(`received user info: ${JSON.stringify(action.userinfo)}\nerror? ${JSON.stringify(action.error)}`)
      return Object.assign({}, state, {...action.userinfo})
    default:
      return state
  }
}

export const profileReducer = (state = {}, action) => {
  switch(action.type){
    case INVALIDATE_PROFILE:
      return Object.assign({}, state, {didInvalidate: true})
    case REQUEST_PROFILE:
      return Object.assign({}, state, {isFetching: true, didInvalidate: false})
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {isFetching: false, didInvalidate: false, ...action.profile})
    default:
      return state
  }
}

export const studentsReducer = (state = {students: [], isFetching: false, didInvalidate: false}, action) => {
  switch(action.type){
    case REQUEST_STUDENTS:
      return Object.assign({}, state, {isFetching: true, didInvalidate: false})
    case RECEIVE_STUDENTS:
      return Object.assign({}, state, {isFetching: false, didInvalidate: false, students: action.students})
    default:
      return state
  }
}
