import React from 'react'
import { FormGroup, Checkbox, Button } from 'react-bootstrap'
import Auth from '../utils/Auth'

class EarlyRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.auth = new Auth()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { newsletter: false, betaprogram: false }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/profile', {
      method: 'get',
      mode: 'cors',
      headers: {
        'Authorization': `Bearer ${this.auth.getIDToken()}`,
      }
    })
    .then(response => response.json())
    .then(profile => {
      if(profile){
        this.setState({
          newsletter: profile.preferences.newsletter,
          betaprogram: profile.preferences.beta_program
        })
      }
    }).catch(function(err) {
      console.log(`an error occurred while fetching /api/profile: ${err}`)
    })
  }

  handleSubmit(e){
    e.preventDefault()

    try{
      fetch('http://localhost:3001/api/profile/preferences', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${this.auth.getIDToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state)
      })
      .then(response => {
        return response.json()
      })
      .catch(function(err) {
        console.log(`an error occurred while fetching /api/profile/preferences: ${err}`)
      })
    }catch(e){
      console.log(`failed to get access token: ${e}`)
      //TODO - probably better to redirect user somewhere in this scenario
      alert(`You might not be logged in`)
    }
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
