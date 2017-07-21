import React from 'react'
import Dashboard from './Dashboard'
import * as containers from '../../auth/components/containers'
import EarlyRegistration from './EarlyRegistration'
import ProfileForm from './ProfileForm'
import StudentsForm from './StudentsForm'

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

export const EarlyRegistrationDashboard = () =>
  <Dashboard>
    <EarlyRegistration />
  </Dashboard>

export const ProfileFormDashboard = () =>
  <Dashboard>
    <ProfileForm />
  </Dashboard>

export const StudentsFormDashboard = () =>
  <Dashboard>
    <StudentsForm />
  </Dashboard>
