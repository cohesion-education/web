import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Routes from './routes'

import { configureAnchors } from 'react-scrollable-anchor'
import 'bootstrap/dist/css/bootstrap.css'

if(!window.config.api_base){
  console.log('window.config.api_base not set - using default/localhost settings')
  window.config.api_base=""
}

ReactGA.initialize(window.config.ga_tracking_id, { debug:true })

configureAnchors({scrollDuration: 1500})

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
