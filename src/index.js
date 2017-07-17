import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Routes from './routes'
import { configureAnchors } from 'react-scrollable-anchor'
import 'bootstrap/dist/css/bootstrap.css'

if(!window.config.api_base){
  console.log('window.config.api_base not set - setting default value')
  window.config.api_base=""
}

console.log(`initializing react-ga with tracking id ${window.config.ga_tracking_id}`)
ReactGA.initialize(window.config.ga_tracking_id, { debug:true })
console.log(`logging page view with ReactGA: ${window.location.pathname + window.location.search}`)
ReactGA.set({ page: window.location.pathname + window.location.search })
ReactGA.pageview(window.location.pathname + window.location.search)

configureAnchors({scrollDuration: 1500})

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
