import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import ReactGA from 'react-ga'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import history from './history'
// import RequiresAuth from './auth/components/RequiresAuth'
import PrivateRoute from './auth/components/PrivateRoute'
import Homepage from './homepage/components/Homepage'
import PageNotFound from './homepage/components/PageNotFound'
import PrivacyPolicy from './homepage/components/PrivacyPolicy'
import * as dashboards from './dashboard/components/ComposedDashboards'
import { homepage } from './homepage/data/'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const initialState = (localStorage['redux-store'])
  ? JSON.parse(localStorage['redux-store'])
  : { homepage: homepage }

const store = configureStore(initialState)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history} handleLocationChange={logPageView}>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/callback' component={dashboards.LoginCallbackDashboard} />
        <Route path='/login' component={dashboards.LoginDashboard} />
        <Route path='/privacy' component={PrivacyPolicy} />
        <PrivateRoute path='/logout' component={dashboards.LogoutDashboard} />
        <PrivateRoute path='/dashboard' component={dashboards.EarlyRegistrationDashboard} />
        <PrivateRoute path='/profile/students' component={dashboards.StudentsFormDashboard} />
        <PrivateRoute path='/profile' component={dashboards.ProfileFormDashboard} />
        <Route component={PageNotFound}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
)
