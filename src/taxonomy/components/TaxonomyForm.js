import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Col, Grid, PageHeader, Nav, NavItem, Row } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'
import Taxonomy from '../../types/Taxonomy'
import * as actions from '../actions'

const styles = {
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
    //TODO - needed handlers:
    // • showChildren
    // • add
    const { list } = this.props
    // console.log(`taxonomyList: ${JSON.stringify(list)}`)

    return(
      <Dashboard>
        <PageHeader>Taxonomy Management</PageHeader>
        <Grid fluid>
          <Row>
            <Col sm={3} style={styles.column}>
              <h3>Grade</h3>
              <Nav bsStyle="pills" stacked activeKey={0} onSelect={this.handleSelect}>
                { list.map((t, i) => {
                  return (
                    <NavItem eventKey={i} title={t.name}>{t.name}</NavItem>
                  )
                })}
              </Nav>
            </Col>
            <Col sm={3} style={styles.column}>
              <h3>Subject</h3>
              <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleSelect}>
                { list[0].children.map((t, i) => {
                  return (
                    <NavItem eventKey={i} title={t.name}>{t.name}</NavItem>
                  )
                })}
              </Nav>
            </Col>
            <Col sm={3} style={styles.column}>
              <h3>Set</h3>
              <Nav bsStyle="pills" stacked activeKey={0} onSelect={this.handleSelect}>
                { list[0].children[1].children.map((t, i) => {
                  return (
                    <NavItem eventKey={i} title={t.name}>{t.name}</NavItem>
                  )
                })}
              </Nav>
            </Col>
            <Col sm={3} style={styles.column}>
              <h3>Unique Set</h3>
              <Nav bsStyle="pills" stacked activeKey={3} onSelect={this.handleSelect}>
                { list[0].children[1].children[0].children.map((t, i) => {
                  return (
                    <NavItem eventKey={i} title={t.name}>{t.name}</NavItem>
                  )
                })}
              </Nav>
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
