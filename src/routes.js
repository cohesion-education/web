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
import RequiresAuth from './utils/RequiresAuth'


const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

const store = configureStore()

const Routes = ({config}) => (
  <Provider store={store}>
    <ConnectedRouter history={history} onUpdate={logPageView}>
      <div>
        <Route exact path="/" render={ () => <Homepage config={config} /> } />
        <Route path="/callback" render={ () => <Callback config={config} /> } />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={RequiresAuth(config, Logout)} />
        <Route path="/dashboard" component={RequiresAuth(config, Dashboard)} />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default Routes
