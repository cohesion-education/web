import * as constants from './constants'
import Taxonomy from '../types/Taxonomy'

export const taxonomyReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case constants.RECEIVE_TAXONOMY_LIST:
      // console.log(`receiving taxonomy list: ${action.list}`)
      const taxonomyList = adapt(action.list)
      const flattened = flattenTaxonomyList(taxonomyList)
      return Object.assign({}, state, {list:taxonomyList, flattened: flattened})
    default:
      return state
  }
}

const flattenTaxonomyList = (list = []) => {
  const flattened = list.map((t) => flatten(t).map((taxonomy) => taxonomy))

  return flattened
}

export const flatten = (taxonomy = new Taxonomy()) => {
  // console.log(`flattening: ${JSON.stringify(taxonomy)}`)
  let flattened = []

  if(taxonomy.children.length === 0){
    flattened.push(Object.assign(new Taxonomy(), {...taxonomy}))
    return flattened
  }

  taxonomy.children.map((c) => {
    const child = Object.assign(new Taxonomy(), {...c})
    child.name = `${taxonomy.name} > ${child.name}`
    flattened = flattened.concat(flatten(child).map((fc) => fc))
  })

  return flattened
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
