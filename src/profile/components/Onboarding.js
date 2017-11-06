import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Alert, PageHeader } from 'react-bootstrap'
import { fetchProfile } from '../actions'
import Profile from '../../types/Profile'
import ProfileForm from './ProfileForm'
import StudentsForm from './StudentsForm'
import PaymentForm from './PaymentForm'
import styles from './onboarding.css'

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

    this.state = {
      current: states.WELCOME
    }
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchProfile: PropTypes.func.isRequired,
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchProfile()
  }

  transition(to) {
    this.setState({current: to})
  }

  render(){
    const { profile } = this.props
    return (
      <div>
        <PageHeader>Welcome to Cohesion Education</PageHeader>
        <div className='onboarding-container'>
          <ul className='onboarding-progressbar'>
            <li className={this.state.current === states.WELCOME ? 'active' : ''}>Welcome</li>
            <li className={this.state.current === states.STUDENTS ? 'active' : ''}>Students</li>
            <li className={this.state.current === states.PAYMENT ? 'active' : ''}>Billing</li>
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
      <div>
        <ProfileForm />

        <button onClick={() => this.transition(states.STUDENTS)}>
          Next
        </button>
      </div>
    )
  }

  renderStudentsForm(){
    return(
      <div>
        <StudentsForm />

        <button onClick={() => this.transition(states.WELCOME)}>
          Back
        </button>
        <button onClick={() => this.transition(states.PAYMENT)}>
          Next
        </button>
      </div>
    )
  }

  renderPaymentForm(){
    return(
      <div>
        <PaymentForm />

        <button onClick={() => this.transition(states.STUDENTS)}>
          Back
        </button>
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    profile:state.profile
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchProfile: bindActionCreators(fetchProfile, dispatch),
  })
)(Onboarding)
