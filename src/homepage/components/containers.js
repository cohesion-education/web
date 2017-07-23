import { connect } from 'react-redux'
import FeatureList from './FeatureList'
import PricingList from './PricingList'
import TestimonialList from './TestimonialList'

export const Features = connect(
  (state) => ({ ...state.homepage.features }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(FeatureList)

export const Pricing = connect(
  (state) => ({ ...state.homepage.pricing }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(PricingList)

export const Testimonials = connect(
  (state) => ({ ...state.homepage.testimonials }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(TestimonialList)
