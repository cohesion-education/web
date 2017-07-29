import * as constants from './constants'
import Taxonomy from '../types/Taxonomy'

export const taxonomyReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_TAXONOMY_LIST:
      // console.log(`receiving taxonomy list: ${action.list}`)
      const taxonomyList = adapt(action.list)
      return Object.assign({}, state, {list:taxonomyList})
    default:
      return state
  }
}

const adapt = (list = []) => {
  if(list === undefined || list === null){
    return []
  }

  const adaptedList = list.map((t) => {
    const taxonomy = Object.assign(new Taxonomy(), {...t})
    taxonomy.children = adapt(t.children)
    return taxonomy
  })

  return adaptedList
}
