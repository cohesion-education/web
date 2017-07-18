import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import ReactGA from 'react-ga'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import history from './history'
import  { Home } from './homepage/components/containers'
import  PageNotFound from './homepage/components/PageNotFound'
import Callback from './utils/Callback'
import Login from './utils/Login'
import Logout from './utils/Logout'
import Dashboard from './dashboard/components/Dashboard'
import EarlyRegistration from './dashboard/components/EarlyRegistration'
import UserProfile from './dashboard/components/UserProfile'
import PrivacyPolicy from './homepage/components/PrivacyPolicy'
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
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/callback' component={Callback} />
        <Route path='/login' component={Login} />
        <Route path='/privacy' component={PrivacyPolicy} />
        <Route path='/logout' component={RequiresAuth(Logout)} />
        <Route path='/dashboard' component={RequiresAuth(EarlyRegistrationDashboard)} />
        <Route path='/profile' component={RequiresAuth(UserProfileDashboard)} />
        <Route component={PageNotFound}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
)

export default Routes
