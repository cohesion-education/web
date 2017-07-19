import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants'

export const authResultReducer = (state = { currentUser: null }, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { currentUser:{...action.currentUser} })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { currentUser:null })
    default:
      return state
  }
}
