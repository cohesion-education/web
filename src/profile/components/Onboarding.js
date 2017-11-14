import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
import * as actions from '../actions'
import Profile from '../../types/Profile'
import { ProfileForm } from './ProfileForm'
import { StudentsForm } from './StudentsForm'
import { PaymentForm } from './PaymentForm'
import history from '../../history'
import './onboarding.css'

const states = {
  WELCOME: 0,
  STUDENTS: 1,
  PAYMENT: 2
}


export class Onboarding extends React.Component {
  constructor(props) {
    super(props)

    this.transition = this.transition.bind(this)
    this.renderCurrentState = this.renderCurrentState.bind(this)
    this.renderWelcome = this.renderWelcome.bind(this)
    this.renderStudentsForm = this.renderStudentsForm.bind(this)
    this.renderPaymentForm = this.renderPaymentForm.bind(this)

    this.handleSaveProfile = this.handleSaveProfile.bind(this)
    this.handleSaveStudents = this.handleSaveStudents.bind(this)
    this.handleSavePaymentDetailsSuccess = this.handleSavePaymentDetailsSuccess.bind(this)

    this.markProfileAsOnboarded = this.markProfileAsOnboarded.bind(this)

    this.state = {
      current: states.WELCOME,
      profile: props.profile,
    }
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchProfileIfNeeded: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
    saveStudents: PropTypes.func.isRequired,
    fetchPaymentDetails: PropTypes.func.isRequired,
    savePaymentDetails: PropTypes.func.isRequired,
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchProfileIfNeeded()
  }

  transition(to) {
    this.setState({current: to})
  }

  handleSaveProfile(profile){
    this.props.saveProfile(profile).then(() => {
      this.transition(states.STUDENTS)
    })
  }

  handleSaveStudents(students){
    this.props.saveStudents(students).then(() => {
      this.transition(states.PAYMENT)
    })
  }

  markProfileAsOnboarded(){
    const profile = Object.assign(this.props.profile, {onboarded: true})
    this.props.saveProfile(profile).then((result) => {
      if(result.errorMessage){
        alert(`An unexpected error occurred when trying to save your information: ${result.errorMessage}`)
        return
      }

      history.replace('/dashboard')
    })
  }

  handleSavePaymentDetailsSuccess(){
    this.markProfileAsOnboarded()
  }

  render(){
    return (
      <div>
        <PageHeader>Welcome to Cohesion Education</PageHeader>
        <div className='onboarding-container'>
          <ul className='onboarding-progressbar'>
            <li className={this.state.current >= states.WELCOME ? 'active' : ''}>Welcome</li>
            <li className={this.state.current >= states.STUDENTS ? 'active' : ''}>Students</li>
            <li className={this.state.current >= states.PAYMENT ? 'active' : ''}>Billing</li>
          </ul>
        </div>
        <p>
          Thank you for enrolling in our exciting new product! Let's get you setup in the system.
        </p>
        { this.renderCurrentState() }
      </div>
    )
  }

  renderCurrentState(){
    switch(this.state.current) {
      case states.WELCOME:
        return this.renderWelcome()
      case states.STUDENTS:
        return this.renderStudentsForm()
      case states.PAYMENT:
        return this.renderPaymentForm()
      default:
        return this.renderWelcome()
    }
  }


  renderWelcome(){
    return(
      <ProfileForm
        profile={this.props.profile}
        saveProfile={this.handleSaveProfile}
        fetchProfileIfNeeded={this.props.fetchProfileIfNeeded}
      />
    )
  }

  renderStudentsForm(){
    return(
      <div>
        <StudentsForm
          profile={this.props.profile}
          students={this.props.profile.students}
          handleSave={this.handleSaveStudents}
          fetchStudentsIfNeeded={this.props.fetchStudentsIfNeeded}
        />
      </div>
    )
  }

  renderPaymentForm(){
    return(
      <div>
        <PaymentForm
          profile={this.props.profile}
          fetchPaymentDetails={this.props.fetchPaymentDetails}
          savePaymentDetails={this.props.savePaymentDetails}
          handleSavePaymentDetailsSuccess={this.handleSavePaymentDetailsSuccess}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    profile:state.profile
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchProfileIfNeeded: bindActionCreators(actions.fetchProfileIfNeeded, dispatch),
    saveProfile: bindActionCreators(actions.saveProfile, dispatch),
    saveStudents: bindActionCreators(actions.saveStudents, dispatch),
    fetchPaymentDetails: bindActionCreators(actions.fetchPaymentDetails, dispatch),
    savePaymentDetails: bindActionCreators(actions.savePaymentDetails, dispatch)
  })
)(Onboarding)
