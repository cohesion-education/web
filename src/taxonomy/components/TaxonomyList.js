import React from 'react'
import PropTypes from 'prop-types'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class TaxonomyForm extends React.Component {

  static propTypes = {
    list: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    baseURI: PropTypes.string.isRequired,
    selectedItem: PropTypes.string,
  }

  static defaultProps = {
    list: [],
    baseURI: '',
    title: ''
  }


  render(){
    //TODO - need an 'add' handler
    const { title, list, baseURI, selectedItem } = this.props

    return(
      <div>
        <h3>{title}</h3>
        <Nav bsStyle="pills" stacked>
          { list.map((t, i) => {
            return (
              <li key={i} role="presentation" className={t.name === selectedItem ? 'active' : ''}>
                <Link to={baseURI + t.name}>{t.name}</Link>
              </li>
            )
          }) }
        </Nav>
      </div>
    )
  }
}
