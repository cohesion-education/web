import React from 'react'
import PropTypes from 'prop-types'

export default class PricingPlan extends React.Component {
  static propTypes = {
    handlePurchaseNow: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired
  }

  static defaultProps =  {
    title:"[default]",
    price: "[default]",
    duration: "[default]"
  }

  render(){
    const { title, price, duration, handlePurchaseNow } = this.props
    return(
      <article className="pricing-column col-lg-4 col-md-4">
        <div className="inner-box">
          <div className="plan-header text-center">
            <h3 className="plan-title">{title}</h3>
            <h2 className="plan-price">{price}</h2>
            <div className="plan-duration">{duration}</div>
          </div>
          <div className="text-center">
            <a onClick={handlePurchaseNow} href="/purchase" className="btn btn-sm btn-custom btn-login">Purchase Now</a>
          </div>
        </div>
      </article>
    )
  }
}
