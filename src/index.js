import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { configureAnchors } from 'react-scrollable-anchor'
import 'bootstrap/dist/css/bootstrap.css'

if(!window.config.api_base){
  console.log('window.config.api_base not set - setting default value')
  window.config.api_base=""
}

configureAnchors({scrollDuration: 1500})

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
