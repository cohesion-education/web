import * as constants from './constants'
import Video from '../types/Video'

export const videoReducer = (state = {list:[], newVideo: new Video()}, action) => {
  switch(action.type){
    case constants.RECEIVE_VIDEO_LIST:
      console.log(`receiving video list: ${action.videos}`)
      return Object.assign({}, state, {list: action.videos})
    case constants.NEW_VIDEO:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.VIDEO_UPDATE:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    default:
      return state
  }
}
