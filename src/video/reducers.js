import * as constants from './constants'
import Video from '../types/Video'

export const videoReducer = (state = {list:[], formBackingObject: new Video(), requestedVideo: new Video()}, action) => {
  switch(action.type){
    case constants.RECEIVE_VIDEO_LIST:
      console.log(`receiving video list: ${action.videos}`)
      return Object.assign({}, state, {list: action.videos})
    case constants.RECEIVE_VIDEO_TO_VIEW:
      return Object.assign({}, state, {requestedVideo: {...action.video}})
    case constants.RECEIVE_VIDEO_TO_EDIT:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.VIDEO_UPDATE:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.NEW_VIDEO:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.VIDEO_VALIDATION_FAILURE:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.VIDEO_SAVE_FAILED:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    case constants.VIDEO_UPLOAD_FAILED:
      return Object.assign({}, state, {formBackingObject: {...action.video}})
    default:
      return state
  }
}
