import React from 'react'
import { Alert, Button, Checkbox, FormGroup } from 'react-bootstrap'
import { fetchPreferences, updatePreferences } from '../actions'

class EarlyRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      newsletter: false,
      beta_program: false,
      error:null,
      successMessage:null,
    }
  }

  componentDidMount() {
    fetchPreferences((profile, err) => {
      if(err){
        let nextState = Object.assign({}, this.state, {error: err})
        this.setState(nextState)
        return
      }

      if(profile){
        let prefs = {...profile.preferences}
        console.log(`{prefs}: ${JSON.stringify(prefs)}`)
        let nextState = Object.assign({}, this.state, prefs)

        console.log(`nextState: ${JSON.stringify(nextState)}`)
        // nextState.newsletter = profile.preferences.newsletter
        // nextState.beta_program = profile.preferences.beta_program
        this.setState(nextState)
        return
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()

    updatePreferences(this.state, err => {
      if(err){
        let nextState = Object.assign({}, this.state, {error: err})
        this.setState(nextState)
        return
      }

      let nextState = Object.assign({}, this.state, {successMessage:"Thank you! Your preferences have been updated"})
      this.setState(nextState)
    })
  }

  render(){
    return(
      <div>
        <h4 className="page-title">Welcome to Cohesion Education</h4>
        <p>
          Thank you for enrolling in our exciting new product! We expect to officially launch this Fall. In the meantime, sign up for our newsletter or request to join our early access Beta program.
        </p>
        { this.state.error &&
          <Alert bsStyle="warning">{this.state.error}</Alert>
        }
        { this.state.successMessage &&
          <Alert bsStyle="success">{this.state.successMessage}</Alert>
        }
        <form>
          <FormGroup>
            <Checkbox checked={this.state.newsletter} onClick={ () => { this.setState({ newsletter: !this.state.newsletter }) }}>
              Sign up for our Newsletter
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Checkbox checked={this.state.beta_program} onClick={ () => { this.setState({ beta_program: !this.state.beta_program }) }}>
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

export default EarlyRegistration;
