import { RECEIVE_PROFILE, RECEIVE_STUDENTS } from './constants'
import { RECEIVE_USER_INFO } from '../auth/constants'
import Profile from '../types/Profile'

export const userinfoReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER_INFO:
      // console.log(`received user info: ${JSON.stringify(action.userinfo)}\nerror? ${JSON.stringify(action.error)}`)
      return Object.assign({}, state, {...action.userinfo})
    default:
      return state
  }
}

export const profileReducer = (state = new Profile(), action) => {
  switch(action.type){
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {...action.profile})
    case RECEIVE_STUDENTS:
      return Object.assign({}, state, {...action.profile})
    default:
      return state
  }
}
