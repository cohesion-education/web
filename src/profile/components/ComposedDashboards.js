import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import EarlyRegistration from './EarlyRegistration'
import ProfileForm from './ProfileForm'
import StudentsForm from './StudentsForm'

export const EarlyRegistrationPage = () =>
  <Dashboard>
    <EarlyRegistration />
  </Dashboard>

export const ProfileFormPage = () =>
  <Dashboard>
    <ProfileForm />
  </Dashboard>

export const StudentsFormPage = () =>
  <Dashboard>
    <StudentsForm />
  </Dashboard>
