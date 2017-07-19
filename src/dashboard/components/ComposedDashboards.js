import React from 'react'
import Dashboard from './Dashboard'
import { LoginCallback, LoginPage, LogoutPage } from '../../auth/components/containers'
import EarlyRegistration from './EarlyRegistration'
import UserProfile from './UserProfile'

export const LoginCallbackDashboard = () =>
  <Dashboard>
    <LoginCallback />
  </Dashboard>

export const LoginDashboard = () =>
  <Dashboard>
    <LoginPage />
  </Dashboard>

export const LogoutDashboard = () =>
  <Dashboard>
    <LogoutPage />
  </Dashboard>

export const EarlyRegistrationDashboard = () =>
  <Dashboard>
    <EarlyRegistration />
  </Dashboard>

export const UserProfileDashboard = () =>
  <Dashboard>
    <UserProfile />
  </Dashboard>
