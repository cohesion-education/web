import React from 'react'
import TopOfPageBackgroundImage from './TopOfPageBackgroundImage'
import FeatureDescriptionList from './FeatureDescriptionList'
import Footer from './Footer'
import { HomepageHeader, Features, Testimonials, Pricing } from './containers'
import '../../css/fonts.css'
import '../../css/font-awesome.css'
import '../../css/homepage.css'

export default class Homepage extends React.Component {
  render(){
    return(
      <div>
        <HomepageHeader />
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
