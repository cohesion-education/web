import { combineReducers } from 'redux'
import { RECEIVE_HOMEPAGE } from './constants'

const headerReducer = (state = {title:'', subtitle:''}, action) => {
  switch(action.type){
    case RECEIVE_HOMEPAGE:
      return Object.assign({}, state, { ...action.header })
    default:
      return state
  }
}

const featuresReducer = (state = {title:'', list:[]}, action) => {
  switch(action.type){
    case RECEIVE_HOMEPAGE:
      return Object.assign({}, state, { ...action.features })
    default:
      return state
  }
}
const testimonialsReducer = (state = {list:[]}, action) => {
  switch(action.type){
    case RECEIVE_HOMEPAGE:
      return Object.assign({}, state, { ...action.testimonials })
    default:
      return state
  }
}

const pricingReducer = (state = {title:'', subtitle:'', list:[]}, action) => {
  switch(action.type){
    case RECEIVE_HOMEPAGE:
      return Object.assign({}, state, { ...action.pricing })
    default:
      return state
  }
}

export const homepageReducers = combineReducers({
  header:headerReducer,
  features:featuresReducer,
  testimonials:testimonialsReducer,
  pricing:pricingReducer
})
