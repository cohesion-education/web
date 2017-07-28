import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, PageHeader, Row } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'
import Taxonomy from '../../types/Taxonomy'
import TaxonomyList from './TaxonomyList'
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
    this.handleSelect = this.handleSelect.bind(this)
  }

  static propTypes = {
    list: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired
  }

  static defaultProps = {
    list: []
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
  }

  handleSelect(e){
    e.preventDefault()
    alert('selected!')
  }

  render(){
    const { match, list } = this.props
    const { grade, subject, set } = match.params
    console.log(`grade: ${grade} subject: ${subject} set: ${set}`)

    const grades = list
    let subjects = (grade !== undefined) ? grades.find((t) => t.name === grade).children : []
    let sets = (subject !== undefined) ? subjects.find((t) => t.name === subject).children : []
    let subsets = (set !== undefined) ? sets.find((t) => t.name === set).children : []

    console.log(`grades: ${grades}`)
    console.log(`subjects: ${subjects}`)
    console.log(`sets: ${sets}`)
    console.log(`subsets: ${subsets}`)

    return(
      <Dashboard>
        <PageHeader>Taxonomy Management</PageHeader>
        <Grid fluid style={styles.fullHeight}>
          <Row style={styles.fullHeight}>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Grade'
                list={grades}
                selectedItem={grade}
                baseURI='/taxonomy/'
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Subject'
                list={subjects}
                selectedItem={subject}
                baseURI={'/taxonomy/' + grade + '/'}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Set'
                list={sets}
                selectedItem={set}
                baseURI={'/taxonomy/' + grade + '/' + subject + '/'}
              />
            </Col>
            <Col sm={3} style={styles.column}>
              <TaxonomyList
                title='Unique Set'
                list={subsets}
                baseURI={'/taxonomy/' + grade + '/' + subject + '/' + set + '/'}
              />
            </Col>
          </Row>
        </Grid>
      </Dashboard>
    )
  }
}

let fakeID = 1
const grade = new Taxonomy(fakeID++, 'Kindergarten')
grade.addChild('ELA', fakeID++)
const subject = grade.addChild('Math', fakeID++)
const unit = subject.addChild('Place Value', fakeID++)
unit.addChild('Represent, Read, Write and Count Numbers One to Five', fakeID++)
unit.addChild('Compare Numbers To Five', fakeID++)
unit.addChild('Represent, Read, Write and Count Numbers 6-8', fakeID++)
unit.addChild('Represent and Compare Numbers to Ten', fakeID++)
unit.addChild('Addition', fakeID++)
unit.addChild('Subtraction', fakeID++)


export default connect(
  //TODO - map to real state.taxonomy.list
  (state) => ({ //mapStateToProps
    list: [
      grade,
      new Taxonomy(fakeID++, '1st'),
      new Taxonomy(fakeID++, '2nd'),
      new Taxonomy(fakeID++, '3rd'),
      new Taxonomy(fakeID++, '4th'),
      new Taxonomy(fakeID++, '5th'),
    ]
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchTaxonomyList: bindActionCreators(actions.fetchTaxonomyList, dispatch),
  })
)(TaxonomyForm)
