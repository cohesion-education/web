import * as constants from './constants'

export const receiveTaxonomyList = (list = []) => {
  return {
    type: constants.RECEIVE_TAXONOMY_LIST,
    taxonomyList: list.slice(),
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
        if(json){
          console.log(`received taxonomy list: ${JSON.stringify(json)}`)
          dispatch(receiveTaxonomyList(json))
        }
      })
      .catch(error => {
        console.log(`error fetching taxonomy list: ${error}\nuri: ${window.config.api_base}/api/profile\nopts: ${JSON.stringify(opts)}`)
        //TODO - dispatch error
        //dispatch(receiveProfileFailure(error))
      })
  }
}
