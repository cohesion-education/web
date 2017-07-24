import * as constants from './constants'

export const taxonomyReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_TAXONOMY_LIST:
      console.log(`receiving taxonomy list: ${action.taxonomyList}`)
      return Object.assign({}, state, {list:action.taxonomyList})
    default:
      return state
  }
}
