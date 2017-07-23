import React from 'react'
import Dashboard from './Dashboard'
import * as containers from '../containers'


export const LoginCallbackDashboard = () =>
  <Dashboard>
    <containers.LoginCallback />
  </Dashboard>

export const LoginDashboard = () =>
  <Dashboard>
    <containers.LoginPage />
  </Dashboard>

export const LogoutDashboard = () =>
  <Dashboard>
    <containers.LogoutPage />
  </Dashboard>
