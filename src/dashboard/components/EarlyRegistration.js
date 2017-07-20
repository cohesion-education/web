import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Alert, Button, Checkbox, FormGroup, PageHeader } from 'react-bootstrap'
import { fetchProfile, handlePreferencesUpdate, savePreferences } from '../actions'
import Profile from '../../types/Profile'

class EarlyRegistration extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    fetchProfile: PropTypes.func.isRequired,
    handlePreferencesUpdate: PropTypes.func.isRequired,
    savePreferences: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchProfile()
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.props.handlePreferencesUpdate(this.props.profile, name, value)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.savePreferences(this.props.profile)
  }

  render(){
    const { profile } = this.props
    return(
      <div>
        <PageHeader>Welcome to Cohesion Education</PageHeader>
        <p>
          Thank you for enrolling in our exciting new product! We expect to officially launch this Fall. In the meantime, sign up for our newsletter or request to join our early access Beta program.
        </p>

        { profile.errorMessage &&
          <Alert bsStyle="warning">{profile.errorMessage}</Alert>
        }
        { profile.successMessage &&
          <Alert bsStyle="success">{profile.successMessage}</Alert>
        }
        <form>
          <FormGroup>
            <Checkbox checked={profile.preferences.newsletter} name="newsletter" onClick={this.handleInputChange}>
              Sign up for our Newsletter
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Checkbox checked={profile.preferences.beta_program} name="beta_program" onClick={this.handleInputChange}>
              Sign up for our early access Beta program
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>
              Save Preferences
            </Button>
          </FormGroup>
        </form>
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
    handlePreferencesUpdate: bindActionCreators(handlePreferencesUpdate, dispatch),
    savePreferences: bindActionCreators(savePreferences, dispatch)
  })
)(EarlyRegistration)
