import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Routes from './routes'

import { configureAnchors } from 'react-scrollable-anchor'
import 'bootstrap/dist/css/bootstrap.css'

if(!window.config){
  console.log('window.config not set - using default/localhost settings')
  window.config = {
    auth0_domain:"cohesioned.auth0.com",
    auth0_client_id:"DBfgngEpPVlRawcfFWme3gxJ6WNwBEl6",
    callback_url:"http://localhost:3000/callback",
    ga_tracking_id:"abc123"
  }
}

ReactGA.initialize(window.config.ga_tracking_id, { debug:true })

configureAnchors({scrollDuration: 1500})

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
