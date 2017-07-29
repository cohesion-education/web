import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, PageHeader, Row } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'
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

class TaxonomyForm extends React.Component {
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
    console.log(`handleFormSubmit: ${value}`)
    const { list, match } = this.props
    const { grade, subject, set } = match.params

    const subjects = this.getChildren(list, grade)
    const sets = this.getChildren(subjects, subject)
    const subsets = this.getChildren(sets, set)

    switch(name){
      case 'grade':
        this.props.addTaxonomy(new Taxonomy(value))
        this.props.fetchTaxonomyList()

        break
      case 'subject':
        const selectedGrade = list.find((t) => t.name === grade)
        const taxonomy = Object.assign(new Taxonomy(), {...selectedGrade})
        taxonomy.addChild(value)
        this.props.updateTaxonomy(taxonomy)
        this.props.fetchTaxonomyList()

        break
      case 'set':
        //TODO

        break
      case 'subset':
        //TODO

        break
      default:
        console.log(`unknown value sent as input name: ${name}`)
    }


  }

  render(){
    const { list, match } = this.props
    const { grade, subject, set } = match.params

    const subjects = this.getChildren(list, grade)
    const sets = this.getChildren(subjects, subject)
    const subsets = this.getChildren(sets, set)

    console.log(`grades: ${list}`)
    console.log(`subjects: ${subjects}`)
    console.log(`sets: ${sets}`)
    console.log(`subsets: ${subsets}`)

    const gradeBaseURI = '/taxonomy/'
    const subjectBaseURI = gradeBaseURI + grade + '/'
    const setBaseURI = gradeBaseURI + subject + '/'
    const subsetBaseURI = setBaseURI + set + '/'

    return(
      <Dashboard>
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
                showAddForm={grade}
                baseURI={subjectBaseURI}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Set'
                list={sets}
                selectedItem={set}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={subject}
                baseURI={setBaseURI}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Subset'
                list={subsets}
                handleFormSubmit={this.handleAddFormSubmit}
                showAddForm={set}
                baseURI={subsetBaseURI}
              />
            </Col>
          </Row>
        </Grid>
      </Dashboard>
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
)(TaxonomyForm)
