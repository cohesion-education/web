import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
import { fetchProfileIfNeeded, saveProfile, saveStudents, savePaymentDetails } from '../actions'
import Profile from '../../types/Profile'
import { ProfileForm } from './ProfileForm'
import { StudentsForm } from './StudentsForm'
import PaymentForm from './PaymentForm'
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
    this.handleSavePaymentDetails = this.handleSavePaymentDetails.bind(this)

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

  handleSaveStudents(profile){
    this.props.saveStudents(profile).then(() => {
      this.transition(states.PAYMENT)
    })
  }

  handleSavePaymentDetails(payment_details){
    console.log(`payment details: ${JSON.stringify(payment_details)}`)
    this.props.savePaymentDetails(payment_details).then((result) => {
      if(result.errorMessage){
        alert(`Failed to save your payment details: ${result.errorMessage}`)
        return
      }

      alert('Your payment details have been saved')

      //TODO - mark 'onboarded' as true for this user

      //TODO - after marking user as onboarded, direct the user to the students video dashboard
    })
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
      />
    )
  }

  renderStudentsForm(){
    return(
      <div>
        <StudentsForm
          profile={this.props.profile.students}
          handleSave={this.handleSaveStudents}
        />
      </div>
    )
  }

  renderPaymentForm(){
    return(
      <div>
        <PaymentForm
          profile={this.props.profile}
          savePaymentDetails={this.handleSavePaymentDetails}
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
    fetchProfileIfNeeded: bindActionCreators(fetchProfileIfNeeded, dispatch),
    saveProfile: bindActionCreators(saveProfile, dispatch),
    saveStudents: bindActionCreators(saveStudents, dispatch),
    savePaymentDetails: bindActionCreators(savePaymentDetails, dispatch)
  })
)(Onboarding)
