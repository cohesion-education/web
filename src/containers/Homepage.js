import React from 'react'
import { connect } from 'react-redux'
import Navbar from '../views/Navbar'
import HomepageHeader from '../views/HomepageHeader'
import Features from '../views/Features'
import FeatureDescriptionList from '../views/FeatureDescriptionList'
import Testimonials from './Testimonials'
import Pricing from '../views/Pricing'
import Footer from '../views/Footer'
import { fetchHomepage } from '../actions'
import '../css/fonts.css'
import '../css/font-awesome.css'
import '../css/homepage.css'


class Homepage extends React.Component {
  componentWillMount(){
    this.props.dispatch(fetchHomepage())
  }

  render (){
    return(
      <div>
        <Navbar />
        <HomepageHeader />
        <Features />
        <FeatureDescriptionList />
        <Testimonials />
        <Pricing />
        <Footer />
      </div>
    )
  }
}

export default connect((state) => state)(Homepage)
