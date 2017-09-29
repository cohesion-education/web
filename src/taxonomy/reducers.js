import * as constants from './constants'
import Taxonomy from '../types/Taxonomy'

export const taxonomyReducer = (state = {list:[], flattened:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_TAXONOMY_LIST:
      const taxonomyList = adapt(action.list)
      return Object.assign({}, state, {list:taxonomyList})
    case constants.RECEIVE_FLATTENED_TAXONOMY_LIST:
      const flattenedList = adapt(action.list)
      return Object.assign({}, state, {flattened:flattenedList})
    default:
      return state
  }
}
//
// const flattenTaxonomyList = (list = []) => {
//   const flattened = []
//
//   list.map((t) => {
//     return flatten(t).map((taxonomy) => {
//       flattened.push(taxonomy)
//       return taxonomy
//     })
//   })
//
//   return flattened
// }
//
// export const flatten = (taxonomy = new Taxonomy()) => {
//   // console.log(`flattening: ${JSON.stringify(taxonomy)}`)
//   const flattened = []
//
//   if(taxonomy.children.length === 0){
//     flattened.push(Object.assign(new Taxonomy(), {...taxonomy}))
//     return flattened
//   }
//
//   taxonomy.children.map((c) => {
//     const child = Object.assign(new Taxonomy(), {...c})
//     child.name = `${taxonomy.name} > ${child.name}`
//     return flatten(child).map((fc) => {
//       flattened.push(fc)
//       return fc
//     })
//   })
//
//   return flattened
// }

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
