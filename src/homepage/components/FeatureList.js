import React from 'react'
import PropTypes from 'prop-types'
import ScrollableAnchor from 'react-scrollable-anchor'
import Feature from './Feature'

class FeatureList extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
  }

  static defaultProps =  {
    title:"",
    list:[]
  }

  render(){
    const {title, list} = this.props
    return(
      <ScrollableAnchor id='features'>
        <section className='section' key='features'>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center">
                <h3 className="title">{title}</h3>
              </div>
            </div>
            <div className="row">
              {list.map((feature, i) =>
                <div key={i} className="col-sm-4">
                  <Feature {...feature}/>
                </div>
              )}
            </div>
          </div>
        </section>
      </ScrollableAnchor>
    )
  }
}

export default FeatureList
