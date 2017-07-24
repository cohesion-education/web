import * as constants from './constants'

export const videoReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_VIDEO_LIST:
      console.log(`receiving video list: ${action.videos}`)
      return Object.assign({}, state, {list:action.videos})
    default:
      return state
  }
}
