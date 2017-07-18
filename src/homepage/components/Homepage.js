import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import TopOfPageBackgroundImage from './TopOfPageBackgroundImage'
import FeatureList from './FeatureList'
import FeatureDescriptionList from './FeatureDescriptionList'
import TestimonialList from './TestimonialList'
import PricingList from './PricingList'
import Footer from './Footer'
import '../../css/fonts.css'
import '../../css/font-awesome.css'
import '../../css/homepage.css'

export default class Homepage extends React.Component {
  static propTypes = {
    fetchHomepage: PropTypes.func.isRequired,
    homepage: PropTypes.object.isRequired
  }

  static defaultProps = {
    fetchHomepage: () => {},
    homepage:{
      features:{
        title:'',
        list:[]
      },
      testimonials:{
        list:[]
      },
      pricing:{
        title:'',
        subtitle:'',
        list:[]
      },
    }
  }

  componentWillMount(){
    this.props.fetchHomepage()
  }

  render(){
    const { features, testimonials, pricing } = this.props.homepage
    return(
      <div>
        <Header />
        <TopOfPageBackgroundImage />
        <FeatureList title={features.title} list={features.list}/>
        <FeatureDescriptionList />
        <TestimonialList list={testimonials.list}/>
        <PricingList title={pricing.title} subtitle={pricing.subtitle} list={pricing.list}/>
        <Footer />
      </div>
    )
  }
}
