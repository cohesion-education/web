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

console.log(`initializing react-ga with tracking id ${window.config.ga_tracking_id}`)
ReactGA.initialize(window.config.ga_tracking_id, { debug:true })

const logPageView = () => {
  console.log(`logging page view with ReactGA: ${window.location.pathname + window.location.search}`)
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const store = configureStore()

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
    <ConnectedRouter history={history} onUpdate={logPageView}>
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
