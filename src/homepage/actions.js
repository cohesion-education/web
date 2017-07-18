import { REQUEST_HOMEPAGE, RECEIVE_HOMEPAGE } from './constants'
import { homepage } from './data/initial-state.js'

export function requestHomepage() {
  return {
    type: REQUEST_HOMEPAGE
  }
}

export function fetchHomepage() {
  return function (dispatch) {
    dispatch(requestHomepage())
    dispatch(receiveHomepage(homepage))
  }
}

export function receiveHomepage(homepage) {
  return {
    type: RECEIVE_HOMEPAGE,
    // header:homepage.header,
    features:homepage.features,
    testimonials:homepage.testimonials,
    pricing:homepage.pricing,
    receivedAt: Date.now()
  }
}
