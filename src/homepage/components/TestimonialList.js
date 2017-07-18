import React from 'react'
import PropTypes from 'prop-types'
import OwlCarousel from 'react-owl-carousel'
import Testimonial from './Testimonial'

export default class TestimonialList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  static defaultProps =  {
    list:[]
  }

  render(){
    const { list } = this.props

    const owlOpts = {
      loop:true,
      margin:10,
      center:true,
      autoplay: true,
      autoplayTimeout: 4000,
      responsive:{
        0:{
          items:1
        }
      }
    }

    return(
      <section className="section">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <OwlCarousel {...owlOpts} className="owl-carousel owl-theme text-center">
                {list.map((testimonial, i) =>
                  <Testimonial key={i} className="item" {...testimonial}/>
                )}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
