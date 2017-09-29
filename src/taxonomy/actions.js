import * as constants from './constants'
import { getIDToken } from '../auth/actions'

export const receiveTaxonomyList = (list = []) => {
  return {
    type: constants.RECEIVE_TAXONOMY_LIST,
    list: list.slice(),
    receivedAt: Date.now()
  }
}

export const receiveFlattenedTaxonomyList = (list = []) => {
  return {
    type: constants.RECEIVE_FLATTENED_TAXONOMY_LIST,
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
  const apiURL = `${window.config.api_base}/api/taxonomy/recursive`
  const opts = {
    method: 'get',
    mode: 'cors'
  }

  return (dispatch) => {
    // console.log('fetching taxonomy list')
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          //TODO - dispatch instead
          alert(`failed to retrieve taxonomy: ${json.error}`)
          return
        }

        dispatch(receiveTaxonomyList(json))
      })
      .catch(error => {
        console.log(`error fetching taxonomy list: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}

export function fetchFlattenedTaxonomyList() {
  const apiURL = `${window.config.api_base}/api/taxonomy/flatten`
  const opts = {
    method: 'get',
    mode: 'cors'
  }

  return (dispatch) => {
    // console.log('fetching taxonomy list')
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          //TODO - dispatch instead
          alert(`failed to retrieve flattened taxonomy list: ${json.error}`)
          return
        }

        dispatch(receiveFlattenedTaxonomyList(json))
      })
      .catch(error => {
        console.log(`error fetching flattened taxonomy list: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}


export function addTaxonomy(taxonomy) {
  console.log(`adding taxonomy with parent_id: ${taxonomy.parent_id}`)
  console.log(`taxonomy: ${JSON.stringify(taxonomy)}`)

  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/taxonomy`
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
    return fetch(apiURL, opts)
      .then(response => response.json())
      .then(json => {
        if(json){
          if(json.error){
            //TODO - dispatch
            alert(`failed to save taxonomy: ${json.error}`)
            return
          }

          dispatch(receiveTaxonomySaveSuccess(json))
        }
      })
      .catch(error => {
        console.log(`error updating taxonomy: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}

export function updateTaxonomy(taxonomy) {
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
          if(json.error){
            //TODO - dispatch
            alert(`failed to update taxonomy: ${json.error}`)
            return
          }

          // console.log(`updated taxonomy ${taxonomy.name}`)
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
