import React from 'react'
import PropTypes from 'prop-types'
import Profile from '../../types/Profile'
import StudentForm from './StudentForm'
import { Alert, Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProfile, handleStudentAdd, handleStudentUpdate, handleStudentRemove, saveProfile } from '../actions'

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
    this.receiveStudentUpdate = this.receiveStudentUpdate.bind(this)
    this.receiveStudentRemoval = this.receiveStudentRemoval.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    handleStudentUpdate: PropTypes.func.isRequired,
    handleStudentAdd: PropTypes.func.isRequired,
    handleStudentRemove: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchProfile()
  }

  receiveStudentUpdate(student, propertyName, value) {
    console.log(`received student update: ${JSON.stringify(student)}\n${propertyName}=${value}`)
    this.props.handleStudentUpdate(this.props.profile, student.id, propertyName, value)
  }

  receiveStudentRemoval(student){
    if(student.isEmpty() || window.confirm(`Are you sure you want to remove ${student.name}?`)){
      console.log(`removing student ${JSON.stringify(student)}`)
      this.props.handleStudentRemove(this.props.profile, student.id)
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
              <Button type='submit' id='add' bsStyle='success' onClick={this.handleAdd} style={styles.saveButton}>
                Add
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={6}>
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
    fetchProfile:  bindActionCreators(fetchProfile, dispatch),
    handleStudentAdd: bindActionCreators(handleStudentAdd, dispatch),
    handleStudentUpdate: bindActionCreators(handleStudentUpdate, dispatch),
    handleStudentRemove: bindActionCreators(handleStudentRemove, dispatch),
    handleSave: bindActionCreators(saveProfile, dispatch),
  })
)(StudentsForm)
