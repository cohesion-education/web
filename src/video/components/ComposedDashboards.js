import React from 'react'
import Dashboard from '../../dashboard/components/Dashboard'
import VideoForm from './VideForm'
import VideoList from './VideoList'

export const VideoListPage = () =>
  <Dashboard>
    <VideoList />
  </Dashboard>

export const VideoFormPage = () =>
  <Dashboard>
    <VideoForm />
  </Dashboard>
