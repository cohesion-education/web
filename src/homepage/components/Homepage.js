import React from 'react'
import Header from './Header'
import TopOfPageBackgroundImage from './TopOfPageBackgroundImage'
import FeatureDescriptionList from './FeatureDescriptionList'
import Footer from './Footer'
import { Features, Testimonials, Pricing } from './containers'
import * as authActions from '../../auth/actions'
import '../../css/fonts.css'
import '../../css/font-awesome.css'
import '../../css/homepage.css'

export default class Homepage extends React.Component {
  render(){
    return(
      <div>
        <Header login={authActions.login}/>
        <TopOfPageBackgroundImage />
        <Features />
        <FeatureDescriptionList />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    )
  }
}
