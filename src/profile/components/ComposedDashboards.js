import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import EarlyRegistration from './EarlyRegistration'
import Onboarding from './Onboarding'
import ProfileForm from './ProfileForm'
import StudentsForm from './StudentsForm'
import PaymentForm from './PaymentForm'

export const EarlyRegistrationPage = () =>
  <Dashboard>
    <EarlyRegistration />
  </Dashboard>

  export const OnboardingPage = () =>
    <Dashboard>
      <Onboarding />
    </Dashboard>

export const ProfileFormPage = () =>
  <Dashboard>
    <ProfileForm />
  </Dashboard>

export const StudentsFormPage = () =>
  <Dashboard>
    <StudentsForm />
  </Dashboard>

export const PaymentFormPage = () =>
  <Dashboard>
    <PaymentForm />
  </Dashboard>
