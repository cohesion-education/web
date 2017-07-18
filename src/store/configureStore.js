import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import { homepageReducers } from '../homepage/reducers'
import { profileReducer } from '../dashboard/reducers'


export default function configureStore(preloadedState) {
  return createStore(
    combineReducers({
      router:routerReducer,
      homepageReducers,
      profile:profileReducer
    }),
    preloadedState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      routerMiddleware(history) // Build the middleware for intercepting and dispatching navigation actions
    )
  )
}
