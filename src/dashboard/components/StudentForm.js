import React from 'react'
import PropTypes from 'prop-types'
import Student from '../../types/Student'
import { Button, Grid, Row, Col, ControlLabel, FormControl, FormGroup } from 'react-bootstrap'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

const styles = {
  label:{
    textAlign:'left',
    fontSize:'18px',
    marginRight:'10px',
  },
  removeButton:{
    margin:'8px 3px',
    fontWeight:'bold',
  }
}

export default class StudentForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  static propTypes = {
    student: PropTypes.object.isRequired,
    handleStudentUpdate: PropTypes.func.isRequired,
    handleStudentRemoval: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  static defaultProps = {
    student: new Student()
  }


  handleUpdate(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.props.handleStudentUpdate(this.props.student, name, value)
  }

  handleRemove(e){
    e.preventDefault()
    this.props.handleStudentRemoval(this.props.student)
  }

  render(){
    const { student, style } = this.props
    return(
      <Grid>
        <Row style={style}>
          <Col sm={8}>
            <FormGroup validationState={student.validationState['name']}>
              <Col sm={1} componentClass={ControlLabel} style={styles.label}>
                Name
              </Col>
              <Col sm={10}>
                <FormControl type='text' bsSize='large' name='name' placeholder='First Name' value={student.name} onChange={this.handleUpdate}/>
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup validationState={student.validationState['grade']}>
              <Col sm={1} componentClass={ControlLabel} style={styles.label}>
                Grade
              </Col>
              <Col sm={10}>
                <FormControl componentClass='select' bsSize='large' name='grade' placeholder='Grade' value={student.grade} onChange={this.handleUpdate}>
                  <option value=''>Grade</option>
                  <option value='K'>Kindergarten</option>
                  <option value='1'>1st</option>
                  <option value='2'>2nd</option>
                  <option value='3'>3rd</option>
                  <option value='4'>4th</option>
                  <option value='5'>5th</option>
                </FormControl>
                <FormControl.Feedback />
              </Col>
            </FormGroup>
            <FormGroup validationState={student.validationState['school']}>
              <Col sm={1} componentClass={ControlLabel} style={styles.label}>
                School
              </Col>
              <Col sm={10}>
                <FormControl type='text' bsSize='large' name='school' placeholder='School' value={student.school} onChange={this.handleUpdate}/>
                <FormControl.Feedback />
              </Col>
            </FormGroup>
          </Col>
          <Col sm={1}>
            <Button bsStyle='danger' bsSize='small' style={styles.removeButton} onClick={this.handleRemove}>
              Remove
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}
