import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import TaxonomyManager from './TaxonomyManager'

export const TaxonomyManagerPage = ({ match }) =>
  <Dashboard>
    <TaxonomyManager match={match}/>
  </Dashboard>
