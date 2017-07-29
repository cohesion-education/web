import * as constants from './constants'
import Taxonomy from '../types/Taxonomy'

export const taxonomyReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_TAXONOMY_LIST:
      console.log(`receiving taxonomy list: ${action.list}`)
      const taxonomyList = action.list.map((t) => Object.assign(new Taxonomy(), {...t}))
      return Object.assign({}, state, {list:taxonomyList})
    default:
      return state
  }
}
