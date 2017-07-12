import React from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import PricingPlan from '../views/PricingPlan'

class PricingList extends React.Component {

  render(){
    return(
      <ScrollableAnchor id='pricing'>
        <section className="section" key="pricing">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="title">Pricing</h3>
                <p className="text-muted sub-title">Quick and easy signup. Affordable with no obligations. Cancel anytime.</p>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-10 col-lg-offset-1">
                <div className="row">
                  <PricingPlan title="Trial" price="Free!" duration="14 days"/>
                  <PricingPlan title="One Child" price="$10.99" duration="Monthly"/>
                  <PricingPlan title="One Child" price="$99" duration="Annually"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default PricingList
