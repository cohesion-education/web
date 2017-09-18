import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import AddVideo from './AddVideo'
import EditVideo from './EditVideo'
import VideoList from '../containers/VideoList'
import AdminShowVideo from './AdminShowVideo'

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
