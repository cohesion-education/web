import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import PricingPlan from './PricingPlan'

export default class PricingList extends React.Component {
  constructor(props) {
    super(props)
    this.handlePurchaseNow = this.handlePurchaseNow.bind(this)
  }

  static propTypes = {
    handlePurchaseNow: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }

  static defaultProps =  {
    title:"",
    subtitle: "",
    list: []
  }

  handlePurchaseNow(e){
    e.preventDefault()
    this.props.handlePurchaseNow()
  }

  render(){
    const {title, subtitle, list} = this.props
    return(
      <ScrollableAnchor id='pricing'>
        <section className="section" key="pricing">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="title">{title}</h3>
                <p className="text-muted sub-title">{subtitle}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10 col-lg-offset-1">
                <div className="row">
                  {list.map((pricing, i) =>
                    <PricingPlan key={i} handlePurchaseNow={this.handlePurchaseNow} {...pricing} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}
