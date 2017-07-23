import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './constants'

export const authResultReducer = (state = {}, action) => {
  switch(action.type){
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {...action.authResult})
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
