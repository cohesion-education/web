import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import FeatureList from './FeatureList'
import Homepage from './Homepage'
// import PricingList from './PricingList'
// import TestimonialList from './TestimonialList'
import { fetchHomepage } from '../actions'

// export const Features = connect(
//   (state) => ({ ...state.features }), //mapStateToProps
//   (dispatch) => ({}) //mapDispatchToProps
// )(FeatureList)

export const Home = connect(
  (state) => state, //mapStateToProps
  (dispatch) => ({ fetchHomepage: bindActionCreators(fetchHomepage, dispatch) }) //mapDispatchToProps
)(Homepage)

// export const Pricing = connect(
//   (state) => ({ ...state.pricing }), //mapStateToProps
//   (dispatch) => ({}) //mapDispatchToProps
// )(PricingList)
//
// export const Testimonials = connect(
//   (state) => ({ ...state.testimonials }), //mapStateToProps
//   (dispatch) => ({}) //mapDispatchToProps
// )(TestimonialList)
