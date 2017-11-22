import fetch from 'isomorphic-fetch'
import * as constants from './constants'
import { getIDToken } from '../auth/actions'
import Video from '../types/Video'

export const newVideo = () => {
  return {
    type: constants.NEW_VIDEO,
    video: new Video(),
  }
}

export const saveFailed = (video) => {
  return {
    type: constants.VIDEO_SAVE_FAILED,
    video: video,
  }
}

export const uploadFailed = (video) => {
  return {
    type: constants.VIDEO_UPLOAD_FAILED,
    video: video,
  }
}

export const validationFailed = (video) => {
  return {
    type: constants.VIDEO_VALIDATION_FAILURE,
    video: Object.assign(new Video(), {...video}),
  }
}

export const update = (v) => {
  return {
    type: constants.VIDEO_UPDATE,
    video: Object.assign(new Video(), {...v}),
  }
}

export const receiveVideoList = (videos = []) => {
  return {
    type: constants.RECEIVE_VIDEO_LIST,
    videos: videos.slice()
  }
}

export const receiveVideoToView = (video = {}) => {
  return {
    type: constants.RECEIVE_VIDEO_TO_VIEW,
    video: Object.assign(new Video(), {...video})
  }
}

export const receiveVideoToEdit = (video = {}) => {
  return {
    type: constants.RECEIVE_VIDEO_TO_EDIT,
    video: Object.assign(new Video(), {...video})
  }
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

export const updateVideoMetadata = (video) => {
  return (dispatch) => {
    const token = getIDToken()
    const opts = {
      method: 'put',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(video)
    }

    return fetch(`${window.config.api_base}/api/video/${video.id}`, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to update video: ${json.error}`
        return json
      }

      json.successMessage = 'Video metadata updated'
      return json
    })
    .catch(err => {
      video.errorMessage = `An error occurred while trying to update video metadata: ${err}`
      console.log(`error:${video.errorMessage}\nuri: ${window.config.api_base}/api/video\nopts: ${JSON.stringify(opts)}`)
      return video
    })
  }
}

export const uploadVideo = (video, file) => {
  return (dispatch) => {
    const token = getIDToken()
    const apiURL = `${window.config.api_base}/api/video/upload/${video.id}`
    const opts = {
      method: 'post',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': file.type,
        'Content-Length': file.size,
      },
      body: file
    }

    return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `Failed to upload video: ${json.error}`
        // console.log(json.errorMessage)
        return json
      }

      json.successMessage = 'Video uploaded'
      // console.log(json.successMessage)
      return json
    })
    .catch(err => {
      video.errorMessage = `An error occurred while trying to upload video: ${err}`
      console.log(`error:${video.errorMessage}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return video
    })
  }
}

export function fetchVideoList() {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/videos`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return (dispatch) => {
    return fetch(uri, opts)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          json.errorMessage = `failed to retrieve videos: ${json.error}`
          return json
        }

        dispatch(receiveVideoList(json.list))
      })
      .catch(error => {
        console.log(`error fetching video list: ${error}\nuri: ${uri}\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}

export function fetchVideosByGrade(grade) {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/videos/by_grade/${grade}`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return fetch(uri, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `failed to retrieve videos by grade: ${json.error}`
        return json
      }

      return json
    })
    .catch(error => {
      return {
        errorMessage: `error fetching videos by grade: ${error}`,
        uri: uri,
        opts: opts,
      }
    })
}

export function fetchVideosBySubject(grade, subject) {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/videos/by_grade/${grade}/by_subject/${subject}`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return fetch(uri, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `failed to retrieve videos by grade: ${json.error}`
        return json
      }

      return json
    })
    .catch(error => {
      return {
        errorMessage: `error fetching videos by grade: ${error}`,
        uri: uri,
        opts: opts,
      }
    })
}

export function fetchVideosByTaxonomy(taxonomy) {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/videos/by_taxonomy/${taxonomy.id}`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return fetch(uri, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `failed to retrieve videos: ${json.error}`
        return json
      }

      return json.list
    })
    .catch(error => {
      return {
        errorMessage: `error fetching video list: ${error}`,
        uri: uri,
        opts: opts,
      }
    })
}

export function fetchVideoByID(id) {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/video/${id}`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return fetch(uri, opts)
    .then(response => response.json())
    .then(json => {
      if(json.error){
        json.errorMessage = `failed to get video by id ${id}: ${json.error}`
        return json
      }

      const video = Object.assign(new Video(), {...json})
      return video
    })
    .catch(error => {
      console.log(`error getting video by id: ${error}\nuri: ${uri}\nopts: ${JSON.stringify(opts)}`)
      return {errorMessage: error}
    })
}

export function deleteVideo(id) {
  const token = getIDToken()
  const uri = `${window.config.api_base}/api/video/${id}`
  const opts = {
    method: 'delete',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }

  return (dispatch) => {
    return fetch(uri, opts)
      .then(response => response.json())
      .catch(error => {
        error.error = `error deleting video by id: ${error}\nuri: ${uri}\nopts: ${JSON.stringify(opts)}`
        return error
      })
  }
}
