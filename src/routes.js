import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import ReactGA from 'react-ga'
import { ConnectedRouter } from 'react-router-redux'
import configureStore from './store/configureStore'
import history from './history'
import AdminRoute from './auth/components/AdminRoute'
import PrivateRoute from './auth/components/PrivateRoute'
import Homepage from './homepage/components/Homepage'
import PageNotFound from './error/components/PageNotFound'
import Forbidden from './error/components/Forbidden'
import NotAuthorized from './error/components/NotAuthorized'
import PrivacyPolicy from './homepage/components/PrivacyPolicy'
import * as authContainers from './auth/components/containers'
import * as profilePages from './profile/components/ComposedDashboards'
import * as videoPages from './video/components/ComposedDashboards'
import TaxonomyManager from './taxonomy/components/TaxonomyManager'
import { homepage } from './homepage/data/'

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search })
  ReactGA.pageview(window.location.pathname + window.location.search)
}

 const initialState = /*(localStorage['redux-store'])
  ? JSON.parse(localStorage['redux-store'])
  : */ { homepage: homepage }

const store = configureStore(initialState)

// store.subscribe(() => {
//   localStorage['redux-store'] = JSON.stringify(store.getState())
// })

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history} handleLocationChange={logPageView}>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/callback' component={authContainers.LoginCallback} />
        <Route path='/login' component={authContainers.LoginPage} />
        <Route path='/privacy' component={PrivacyPolicy} />
        <PrivateRoute path='/logout' component={authContainers.LogoutPage} />
        <PrivateRoute path='/dashboard' component={profilePages.EarlyRegistrationPage} />
        <PrivateRoute path='/profile/students' component={profilePages.StudentsFormPage} />
        <PrivateRoute path='/profile' component={profilePages.ProfileFormPage} />
        <AdminRoute path='/taxonomy/:grade/:subject/:set/:subset' component={TaxonomyManager} />
        <AdminRoute path='/taxonomy/:grade/:subject/:set' component={TaxonomyManager} />
        <AdminRoute path='/taxonomy/:grade/:subject' component={TaxonomyManager} />
        <AdminRoute path='/taxonomy/:grade' component={TaxonomyManager} />
        <AdminRoute path='/taxonomy' component={TaxonomyManager} />
        <AdminRoute path='/videos' component={videoPages.VideoListPage} />
        <AdminRoute path='/video/add' component={videoPages.VideoFormPage} />
        <Route path='/401' component={NotAuthorized}/>
        <Route path='/403' component={Forbidden}/>
        <Route component={PageNotFound}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
)
