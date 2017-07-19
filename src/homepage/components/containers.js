import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './Header'
import FeatureList from './FeatureList'
import PricingList from './PricingList'
import TestimonialList from './TestimonialList'
import { login } from '../../auth/actions'

export const Features = connect(
  (state) => ({ ...state.homepage.features }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(FeatureList)

export const HomepageHeader = connect(
  (state) => ({}), //mapStateToProps
  (dispatch) => ({ login: bindActionCreators(login, dispatch) }) //mapDispatchToProps
)(Header)

export const Pricing = connect(
  (state) => ({ ...state.homepage.pricing }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(PricingList)

export const Testimonials = connect(
  (state) => ({ ...state.homepage.testimonials }), //mapStateToProps
  (dispatch) => ({}) //mapDispatchToProps
)(TestimonialList)
