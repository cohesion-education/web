import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import history from '../history'
import { homepageReducer } from '../homepage/reducers'
import { authResultReducer } from '../auth/reducers'
import { profileReducer, userinfoReducer } from '../profile/reducers'
import { taxonomyReducer } from '../taxonomy/reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    combineReducers({
      router:routerReducer,
      homepage: homepageReducer,
      authResult: authResultReducer,
      userinfo: userinfoReducer,
      profile: profileReducer,
      taxonomy: taxonomyReducer,
    }),
    preloadedState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware, // neat middleware that logs actions
      routerMiddleware(history) // Build the middleware for intercepting and dispatching navigation actions
    )
  )
}
