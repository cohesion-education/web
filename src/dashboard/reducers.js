import { RECEIVE_USER_INFO } from '../auth/constants'

export const userinfoReducer = (state = {}, action) => {
  switch(action.type){
    case RECEIVE_USER_INFO:
      console.log(`received user info: ${JSON.stringify(action.userinfo)}\nerror? ${JSON.stringify(action.error)}`)
      return Object.assign({}, state, {...action.userinfo})
    default:
      return state
  }
}
