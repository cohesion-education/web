import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { PageHeader } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'
import * as actions from '../actions'

class TaxonomyForm extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  static propTypes = {
    taxonomyList: PropTypes.array.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired
  }

  static defaultProps = {
    taxonomyList: []
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
  }


  render(){
    //TODO - needed handlers:
    // • showChildren
    // • add
    const { taxonomyList } = this.props
    console.log(`taxonomyList: ${JSON.stringify(taxonomyList)}`)

    return(
      <Dashboard>
        <PageHeader>Taxonomy Management</PageHeader>

        <ul>
          { taxonomyList.map((t, i) => {
            return (
              <li>
                <a className="taxonomy">
                  {t.name}
                </a>
              </li>
            )
          })}
          <li className="add">
            <a className="add-taxonomy">
              Add
            </a>
          </li>
        </ul>
      </Dashboard>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    taxonomyList: state.taxonomy.list
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchTaxonomyList: bindActionCreators(actions.fetchTaxonomyList, dispatch),
  })
)(TaxonomyForm)
