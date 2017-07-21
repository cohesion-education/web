import React from 'react'
import PropTypes from 'prop-types'
import Profile from '../../types/Profile'
import StudentForm from './StudentForm'
import { Alert, Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleStudentUpdate } from '../actions'

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

class StudentsForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.receiveStudentUpdate = this.receiveStudentUpdate.bind(this)
    this.receiveStudentRemoval = this.receiveStudentRemoval.bind(this)
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    handleStudentUpdate: PropTypes.func.isRequired
  }

  static defaultProps = {
    profile: new Profile()
  }

  receiveStudentUpdate(student, propertyName, value) {
    console.log(`received student update: ${JSON.stringify(student)}\n${propertyName}=${value}`)
    this.props.handleStudentUpdate(this.props.profile, student.id, propertyName, value)
  }

  receiveStudentRemoval(student){
    if(window.confirm(`Are you sure you want to remove ${student.name}?`)){
      console.log(`removing student ${JSON.stringify(student)}`)
    }
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('saving students - haha, I know, right? :-)')
  }

  render(){
    const { profile } = this.props

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
          { profile.students.map((student, i) =>
            <StudentForm
              student={student}
              key={i}
              handleStudentUpdate={this.receiveStudentUpdate}
              handleStudentRemoval={this.receiveStudentRemoval}
              style={i % 2 === 0 ? styles.evenStudentFormGroup : styles.oddStudentFormGroup}
            />
          )}
          <FormGroup>
            <Col sm={6}>
              <Button type='submit' bsStyle='primary' onClick={this.handleSubmit} style={styles.saveButton}>
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

const dummyProfile = new Profile()
dummyProfile.addStudent('Billy', '4', 'Smith Elementary', 1)
dummyProfile.addStudent('Sally', '3', 'Alafia Elementary', 2)
dummyProfile.addStudent('Molly', '2', 'Mintz Elementary', 3)

export default connect(
  (state) => ({ //mapStateToProps
    //TODO - wire this into the real state tree
    profile: dummyProfile
  }),
  (dispatch) => ({ //mapDispatchToProps
    handleStudentUpdate: bindActionCreators(handleStudentUpdate, dispatch)
  })
)(StudentsForm)
