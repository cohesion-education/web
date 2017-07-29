import * as constants from './constants'
import { getIDToken } from '../auth/actions'

export const receiveTaxonomyList = (list = []) => {
  return {
    type: constants.RECEIVE_TAXONOMY_LIST,
    list: list.slice(),
    receivedAt: Date.now()
  }
}

export const receiveTaxonomySaveSuccess = (taxonomy) => {
  return {
    type: constants.RECEIVE_TAXONOMY_SAVE_SUCCESS,
    taxonomy: taxonomy,
    receivedAt: Date.now()
  }
}

export function fetchTaxonomyList() {
  const opts = {
    method: 'get',
    mode: 'cors'
  }

  return (dispatch) => {
    console.log('fetching taxonomy list')
    return fetch(`${window.config.api_base}/api/taxonomy`, opts)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          //TODO - dispatch instead
          alert(`failed to retrieve taxonomy: ${json.error}`)
          return
        }

        console.log(`received taxonomy list: ${JSON.stringify(json)}`)
        dispatch(receiveTaxonomyList(json))
      })
      .catch(error => {
        console.log(`error fetching taxonomy list: ${error}\nuri: ${window.config.api_base}/api/profile\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}


export function addTaxonomy(taxonomy) {
  // console.log(`saveTaxonomy::${JSON.stringify(taxonomy)}`)

  const token = getIDToken()
  const opts = {
    method: 'post',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taxonomy)
  }

  return (dispatch) => {
    return fetch(`${window.config.api_base}/api/taxonomy`, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          console.log(`POST /api/taxonomy result: ${JSON.stringify(json)}`)
          if(json.error){
            //TODO - dispatch
            alert(`failed to save taxonomy: ${json.error}`)
            return
          }

          dispatch(receiveTaxonomySaveSuccess(json))
        }
      })
      .catch(error => {
        console.log(`error updating taxonomy: ${error}\nuri: ${window.config.api_base}/api/taxonomy\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}

export function updateTaxonomy(taxonomy) {
  // console.log(`saveTaxonomy::${JSON.stringify(taxonomy)}`)

  const token = getIDToken()
  const opts = {
    method: 'put',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taxonomy)
  }

  return (dispatch) => {
    return fetch(`${window.config.api_base}/api/taxonomy/${taxonomy.id}`, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          console.log(`PUT /api/taxonomy result: ${JSON.stringify(json)}`)
          if(json.error){
            //TODO - dispatch
            alert(`failed to update taxonomy: ${json.error}`)
            return
          }

          dispatch(receiveTaxonomySaveSuccess(json))
        }
      })
      .catch(error => {
        console.log(`error updating taxonomy: ${error}\nuri: ${window.config.api_base}/api/taxonomy/${taxonomy.id}\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}
