import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import ReactGA from 'react-ga'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import history from './history'
import Homepage from './containers/Homepage'
import Callback from './utils/Callback'
import Login from './utils/Login'
import Logout from './utils/Logout'
import Dashboard from './containers/Dashboard'
import EarlyRegistration from './views/EarlyRegistration'
import UserProfile from './views/UserProfile'
import PrivacyPolicy from './views/PrivacyPolicy'
import RequiresAuth from './utils/RequiresAuth'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const initialState = (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : {}
const store = configureStore(initialState)

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState())
})

const EarlyRegistrationDashboard = () =>
  <Dashboard>
    <EarlyRegistration />
  </Dashboard>

const UserProfileDashboard = () =>
  <Dashboard>
    <UserProfile />
  </Dashboard>

const Routes = () => (
  <Provider store={store}>
    <ConnectedRouter history={history} handleLocationChange={logPageView}>
      <div>
        <Route exact path="/" component={Homepage} />
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/logout" component={RequiresAuth(Logout)} />
        <Route path="/dashboard" component={RequiresAuth(EarlyRegistrationDashboard)} />
        <Route path="/profile" component={RequiresAuth(UserProfileDashboard)} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default Routes
