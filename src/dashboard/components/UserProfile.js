import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { fetchProfile, handleProfileUpdate, saveProfile } from '../actions'
import Profile from '../../types/Profile'

const styles = {
  label:{
    textAlign:'left',
    fontSize:'18px',
  },
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    handleProfileUpdate: PropTypes.func.isRequired,
    saveProfile: PropTypes.func.isRequired,
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
    this.props.handleProfileUpdate(this.props.profile, name, value)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.saveProfile(this.props.profile)
  }

  render(){
    const { profile } = this.props

    return(
      <div>
        <PageHeader>Your Profile</PageHeader>
        { profile.errorMessage &&
          <Alert bsStyle="warning">{profile.errorMessage}</Alert>
        }
        { profile.successMessage &&
          <Alert bsStyle="success">{profile.successMessage}</Alert>
        }
        <Form horizontal>
          <FormGroup validationState={profile.validationState['name']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              Name
            </Col>
            <Col sm={6}>
              <FormControl type="text" bsSize="large" name="name" placeholder="Happy Parent" value={profile.name} onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={profile.validationState['email']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              Email
            </Col>
            <Col sm={6}>
              <FormControl type="email" bsSize="large" name="email" placeholder="hello@domain.com" value={profile.email} onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={profile.validationState['state']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              State
            </Col>
            <Col sm={6}>
              <FormControl componentClass="select" bsSize="large" name="state" placeholder="State" value={profile.state} onChange={this.handleInputChange}>
                <option value="">State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="PR">Puerto Rico</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={profile.validationState['county']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              County
            </Col>
            <Col sm={6}>
              <FormControl type="text" bsSize="large" name="county" placeholder="Monroe County" value={profile.county} onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={1} sm={6}>
              <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>
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
    fetchProfile: bindActionCreators(fetchProfile, dispatch),
    handleProfileUpdate: bindActionCreators(handleProfileUpdate, dispatch),
    saveProfile: bindActionCreators(saveProfile, dispatch),
  })
)(UserProfile)
