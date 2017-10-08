import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import AddVideo from './AddVideo'
import EditVideo from './EditVideo'
import VideoList from '../containers/VideoList'
import ShowVideo from './ShowVideo'
import AdminShowVideo from './AdminShowVideo'
import ByTaxonomy from './ByTaxonomy'

export const VideoListPage = () =>
  <Dashboard>
    <VideoList />
  </Dashboard>

export const AddVideoPage = () =>
  <Dashboard>
    <AddVideo />
  </Dashboard>

export const EditVideoPage = ({ match }) =>
  <Dashboard>
    <EditVideo match={match} />
  </Dashboard>

export const AdminShowVideoPage = ({ match }) =>
  <Dashboard>
    <AdminShowVideo match={match} />
  </Dashboard>

export const ShowVideoPage = ({ match }) =>
  <Dashboard>
    <ShowVideo match={match} />
  </Dashboard>


export const BySetPage = ({ match }) =>
  <Dashboard>
    <ByTaxonomy match={match} />
  </Dashboard>
export const ByUnitPage = ({ match }) =>
  <Dashboard>
    <ByTaxonomy match={match} />
  </Dashboard>
export const BySubjectPage = ({ match }) =>
  <Dashboard>
    <ByTaxonomy match={match} />
  </Dashboard>
export const ByGradePage = ({ match }) =>
  <Dashboard>
    <ByTaxonomy match={match} />
  </Dashboard>
