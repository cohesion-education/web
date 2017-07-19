import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import ReactGA from 'react-ga'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import history from './history'
// import Callback from './auth/components/Callback'
// import Login from './auth/components/Login'
// import Logout from './auth/components/Logout'
import RequiresAuth from './auth/components/RequiresAuth'
import Homepage from './homepage/components/Homepage'
import PageNotFound from './homepage/components/PageNotFound'
import PrivacyPolicy from './homepage/components/PrivacyPolicy'
import { LoginCallbackDashboard, LoginDashboard, LogoutDashboard, EarlyRegistrationDashboard, UserProfileDashboard } from './dashboard/components/ComposedDashboards'
import { homepage } from './homepage/data/'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const initialState = (localStorage['redux-store'])
  ? JSON.parse(localStorage['redux-store'])
  : {homepage: homepage, currentUser: null}

const store = configureStore(initialState)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history} handleLocationChange={logPageView}>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/callback' component={LoginCallbackDashboard} />
        <Route path='/login' component={LoginDashboard} />
        <Route path='/privacy' component={PrivacyPolicy} />
        <Route path='/logout' component={RequiresAuth(LogoutDashboard)} />
        <Route path='/dashboard' component={RequiresAuth(EarlyRegistrationDashboard)} />
        <Route path='/profile' component={RequiresAuth(UserProfileDashboard)} />
        <Route component={PageNotFound}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
)
