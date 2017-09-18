import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, PageHeader, Row } from 'react-bootstrap'
import TaxonomyList from './TaxonomyList'
import Taxonomy from '../../types/Taxonomy'
import * as actions from '../actions'

const styles = {
  fullHeight:{
    height:'100%',
  },
  column:{
    padding:'5px',
    height:'100%',
  },
}

class TaxonomyManager extends React.Component {
  constructor(props) {
    super(props)
    this.getChildren = this.getChildren.bind(this)
    this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this)
  }

  static propTypes = {
    list: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired,
    addTaxonomy: PropTypes.func.isRequired,
    updateTaxonomy: PropTypes.func.isRequired,
  }

  static defaultProps = {
    list: []
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
  }

  getChildren(list = [], selected = ''){
    let children = []

    if(selected !== undefined && selected !== ''){
      const item = list.find((t) => t.name === selected)
      if(item != null && item.children != null){
        children = item.children
      }
    }
    return children
  }

  handleAddFormSubmit(name, value){
    if(value === '' || value === undefined){
      console.log('value was empty - ignoring')
      return
    }

    console.log(`handleFormSubmit ${name}=${value}`)

    const { list, match } = this.props
    const { grade, subject, unit } = match.params

    const selectedGrade = list.find((t) => t.name === grade)
    const taxonomy = Object.assign(new Taxonomy(), {...selectedGrade})

    switch(name){
      case 'grade':
        this.props.addTaxonomy(new Taxonomy(value)).then(() => this.props.fetchTaxonomyList())
        break
      case 'subject':
        taxonomy.addChild(value)
        this.props.updateTaxonomy(taxonomy).then(() => this.props.fetchTaxonomyList())
        break
      case 'unit':
        taxonomy.findChild(subject).addChild(value)
        this.props.updateTaxonomy(taxonomy).then(() => this.props.fetchTaxonomyList())

        break
      case 'set':
        taxonomy.findChild(subject).findChild(unit).addChild(value)
        this.props.updateTaxonomy(taxonomy).then(() => this.props.fetchTaxonomyList())

        break
      default:
        console.log(`unknown value sent as input name: ${name}`)
    }


  }

  render(){
    const { list, match } = this.props
    const { grade, subject, unit } = match.params

    const subjects = this.getChildren(list, grade)
    const units = this.getChildren(subjects, subject)
    const sets = this.getChildren(units, unit)

    const gradeBaseURI = '/admin/taxonomy/'
    const subjectBaseURI = gradeBaseURI + grade + '/'
    const unitBaseURI = subjectBaseURI + subject + '/'
    const setBaseURI = unitBaseURI + unit + '/'

    return(
      <div>
        <PageHeader>Taxonomy Management</PageHeader>
        <Grid fluid style={styles.fullHeight}>
          <Row style={styles.fullHeight}>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Grade'
                list={list}
                selectedItem={grade}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={true}
                baseURI={gradeBaseURI}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Subject'
                list={subjects}
                selectedItem={subject}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={grade !== undefined && grade !== ''}
                baseURI={subjectBaseURI}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Unit'
                list={units}
                selectedItem={unit}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={subject !== undefined && subject !== ''}
                baseURI={unitBaseURI}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Set'
                list={sets}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={unit !== undefined && unit !== ''}
                baseURI={setBaseURI}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    list: state.taxonomy.list
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchTaxonomyList: bindActionCreators(actions.fetchTaxonomyList, dispatch),
    addTaxonomy: bindActionCreators(actions.addTaxonomy, dispatch),
    updateTaxonomy: bindActionCreators(actions.updateTaxonomy, dispatch),
  })
)(TaxonomyManager)
