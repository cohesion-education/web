import React from 'react'
import PropTypes from 'prop-types'
import Profile from '../../types/Profile'
import Student from '../../types/Student'
import StudentForm from './StudentForm'
import { Alert, Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

const styles = {
  oddStudentFormGroup:{
    backgroundColor:'white',
    borderBottom:'1px solid #d8d8d8',
    padding:'10px 15px'
  },
  evenStudentFormGroup:{
    backgroundColor:'#f2f2f2',
    borderBottom:'1px solid #d8d8d8',
    padding:'10px 15px'
  },
  label:{
    textAlign:'left',
    fontSize:'18px',
  },
  removeButton:{
    margin:'8px 3px',
    fontWeight:'bold',
  },
  saveButton:{
    marginTop:'1em',
  }
}

export class StudentsForm extends React.Component {
  constructor(props) {
    super(props)
    this.receiveStudentUpdate = this.receiveStudentUpdate.bind(this)
    this.receiveStudentRemoval = this.receiveStudentRemoval.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchStudents: PropTypes.func.isRequired,
    handleStudentUpdate: PropTypes.func.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentRemove: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchStudents()
  }

  receiveStudentUpdate(student, propertyName, value) {
    console.log(`received student update: ${JSON.stringify(student)}\n${propertyName}=${value}`)
    this.props.handleStudentUpdate(this.props.profile, student, propertyName, value)
  }

  receiveStudentRemoval(student){
    if(student.isEmpty() || window.confirm(`Are you sure you want to remove ${student.name}?`)){
      console.log(`removing student ${JSON.stringify(student)}`)
      this.props.handleStudentRemove(this.props.profile, student)
    }
  }

  handleAdd(e){
    e.preventDefault()
    this.props.handleStudentAdd(this.props.profile)
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('saving students - haha, I know, right? :-)')
    this.props.handleSave(this.props.profile)
  }

  render(){
    const { profile } = this.props
    let { students } = profile
    students = students === null ? [] : students

    return(
      <div>
        <PageHeader>My Students</PageHeader>
        { profile.errorMessage &&
          <Alert bsStyle='warning'>{profile.errorMessage}</Alert>
        }
        { profile.successMessage &&
          <Alert bsStyle='success'>{profile.successMessage}</Alert>
        }
        <Form horizontal>
          { students.map((s, i) => {
            // instantiating new student object to ensure that validation methods, etc can be called further down the stack
            const student = Object.assign(new Student(), {...s})

            return (
              <StudentForm
                student={student}
                key={i}
                handleStudentUpdate={this.receiveStudentUpdate}
                handleStudentRemoval={this.receiveStudentRemoval}
                style={i % 2 === 0 ? styles.evenStudentFormGroup : styles.oddStudentFormGroup}
              />
            )
          })}
          <FormGroup>
            <Col sm={1}>
              <Button type='submit' id='add' bsStyle='success' onClick={this.handleAdd} style={styles.saveButton}>
                Add
              </Button>
            </Col>
            <Col sm={1}>
              <Button type='submit' id='save' bsStyle='primary' onClick={this.handleSubmit} style={styles.saveButton}>
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    profile: state.profile
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchStudents:  bindActionCreators(actions.fetchStudents, dispatch),
    handleStudentAdd: bindActionCreators(actions.handleStudentAdd, dispatch),
    handleStudentUpdate: bindActionCreators(actions.handleStudentUpdate, dispatch),
    handleStudentRemove: bindActionCreators(actions.handleStudentRemove, dispatch),
    handleSave: bindActionCreators(actions.saveStudents, dispatch),
  })
)(StudentsForm)
