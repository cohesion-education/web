import React from 'react'
import { FormGroup, Checkbox, Button } from 'react-bootstrap'
import { fetchPreferences, updatePreferences } from '../actions'

class EarlyRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { newsletter: false, betaprogram: false }
  }

  componentDidMount() {
    fetchPreferences(profile => {
      if(profile){
        this.setState({
          newsletter: profile.preferences.newsletter,
          betaprogram: profile.preferences.beta_program
        })
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    updatePreferences(this.state)
  }

  render(){
    return(
      <div>
        <h4 className="page-title">Welcome to Cohesion Education</h4>
        <p>
          Thank you for enrolling in our exciting new product! We expect to officially launch this Fall. In the meantime, sign up for our newsletter or request to join our early access Beta program.
        </p>
        <form>
          <FormGroup>
            <Checkbox checked={this.state.newsletter} onClick={ () => { this.setState({ newsletter: !this.state.newsletter }) }}>
              Sign up for our Newsletter
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Checkbox checked={this.state.betaprogram} onClick={ () => { this.setState({ betaprogram: !this.state.betaprogram }) }}>
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
