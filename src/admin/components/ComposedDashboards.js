import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import UsersReport from './UsersReport'
import StudentsReport from './StudentsReport'
import PaymentDetailsReport from './PaymentDetailsReport'

export const AdminReportPage = () =>
  <Dashboard>
    <UsersReport />
    <StudentsReport />
    <PaymentDetailsReport />
  </Dashboard>
