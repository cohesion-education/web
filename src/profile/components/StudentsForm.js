import React from 'react'
import PropTypes from 'prop-types'
import Student from '../../types/Student'
import Profile from '../../types/Profile'
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

    this.state = {
      students: props.students ? props.students : [],
      profile: props.profile,
    }
  }

  static propTypes = {
    students: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
    fetchStudentsIfNeeded: PropTypes.func,
    handleSave: PropTypes.func.isRequired
  }

  static defaultProps = {
    students: [],
    profile: new Profile()
  }

  componentDidMount() {
    if(this.props.fetchStudentsIfNeeded){
      this.props.fetchStudentsIfNeeded()
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      students: nextProps.students,
      profile: nextProps.profile,
    })
  }

  handleAdd(e){
    e.preventDefault()
    const { students } = this.state
    const nextStudents = (students !== null ? students.slice() : [])
    nextStudents.push(new Student('', '', '', nextStudents.length))

    this.setState(Object.assign(this.state, {students:nextStudents}))
  }

  receiveStudentUpdate(existingStudent, propertyKey, value) {
    let { students } = this.state
    let nextStudents = students.map(student => {
      if (student.id === existingStudent.id) {
        let { studentValidationErrors, studentValidationState, ...remainingStudentProps } = student
        let updatedStudent = Object.assign(new Student(), {...remainingStudentProps})
        updatedStudent[propertyKey]=value
        return updatedStudent
      } else {
        return student
      }
    })

    this.setState(Object.assign(this.state, {students:nextStudents}))
  }

  receiveStudentRemoval(studentToRemove){
    if(studentToRemove.isEmpty() || window.confirm(`Are you sure you want to remove ${studentToRemove.name}?`)){
      // console.log(`removing student ${JSON.stringify(studentToRemove)}`)
      let { students } = this.state
      let nextStudents = students.filter(student => student.name !== studentToRemove.name)

      this.setState(Object.assign(this.state, {students:nextStudents}))
    }
  }

  handleSubmit(e){
    e.preventDefault()
    // console.log('saving students - haha, I know, right? :-)')
    //TODO - validate each student first
    this.props.handleSave(this.state.students)
  }

  render(){
    let { students, profile } = this.state
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
    students: state.students,
    profile: state.profile,
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchStudentsIfNeeded:  bindActionCreators(actions.fetchStudentsIfNeeded, dispatch),
    handleSave: bindActionCreators(actions.saveStudents, dispatch),
  })
)(StudentsForm)
