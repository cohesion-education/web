import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import Feature from '../views/Feature'
import bookshelf from '../images/bookshelf.png'
import getmoney from '../images/get-money.png'
import professor from '../images/professor.png'

class FeatureList extends React.Component {
  render(){
    return(
      <ScrollableAnchor id='features'>
        <section className='section' key='features'>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="title">Why Cohesion Education?</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <Feature imgURI={bookshelf} imgAltText="Bookshelf" description="IMMEDIATE ACCESS to instruction of every K-5 math, reading, and writing standard allows parents to be proactive and take ownership of the support they provide"/>
              </div>
              <div className="col-sm-4">
                <Feature imgURI={professor} imgAltText="Certified Teacher" description="With CERTIFIED TEACHERS, you can see actual teaching students experience in the classroom"/>
              </div>
              <div className="col-sm-4">
                <Feature imgURI={getmoney} imgAltText="Affordable" description="An AFFORDABLE alternative to expensive tutoring services"/>
              </div>
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default connect(
  state => ({ ...state.features }),
  dispatch => ({})
)(FeatureList)
