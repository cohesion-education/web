import fetch from 'isomorphic-fetch'
import * as constants from './constants'
import { getIDToken } from '../auth/actions'
import Video from '../types/Video'

export const newVideo = (v) => {
  return {
    type: constants.NEW_VIDEO,
    video: Object.assign(new Video(), {...v}),
  }
}

export const updateVideo = (v) => {
  return {
    type: constants.VIDEO_UPDATE,
    video: Object.assign(new Video(), {...v}),
  }
}

export const videoUpdateHandler = (video, key, val) => {
  let { validationErrors, validationState, errorMessage, successMessage, ...remainingProps } = video
  let updated = Object.assign(new Video(), {...remainingProps})
  updated[key] = val
  updated.validate()

  return updateVideo(updated)
}

export const saveVideoMetadata = (video) => {
  return (dispatch) => {
    const token = getIDToken()
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video)
    }

    return fetch(`${window.config.api_base}/api/video`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to save video: ${json.error}`
        return json
      }

      json.successMessage = 'Video metadata saved'
      return json
    })
    .catch(err => {
      video.errorMessage = `An error occurred while trying to save video metadata: ${err}`
      console.log(`error:${video.errorMessage}\nuri: ${window.config.api_base}/api/video\nopts: ${JSON.stringify(opts)}`)
      return video
    })
  }
}

export const uploadVideo = (video, file) => {
  return (dispatch) => {
    const token = getIDToken()
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'file-name': file.name,
        'Content-Type': file.type,
        'Content-Length': file.size,
      },
      body: file
    }


    return fetch(`${window.config.api_base}/api/video/upload/${video.id}`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to upload video: ${json.error}`
        console.log(json.errorMessage)
        return json
      }

      json.successMessage = 'Video uploaded'
      console.log(json.successMessage)
      return json
    })
    .catch(err => {
      video.errorMessage = `An error occurred while trying to upload video: ${err}`
      console.log(`error:${video.errorMessage}\nuri: ${window.config.api_base}/api/video/upload/${video.id}\nopts: ${JSON.stringify(opts)}`)
      return video
    })
  }
}
