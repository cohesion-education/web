import React from 'react'
import PropTypes from 'prop-types'

class Feature extends React.Component {
  static propTypes = {
    imgURI: PropTypes.string.isRequired,
    imgAltText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }

  static defaultProps =  {
    imgURI: "",
    imgAltText: "",
    description:""
  }

  render(){
    const {imgURI, imgAltText, description} = this.props

    return(
      <div className="features-box">
        <img src={imgURI} alt={imgAltText} />
        <p className="text-muted">{description}</p>
      </div>
    )
  }
}

export default Feature;
