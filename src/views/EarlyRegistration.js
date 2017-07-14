import React from 'react'
import { FormGroup, Checkbox, Button } from 'react-bootstrap'

class EarlyRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault()

    alert(`form submitted. beta program: ${this.betaprogram.value} newsletter: ${this.newsletter.value}`)
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
            <Checkbox inputRef={ref => { this.newsletter = ref; }}>
              Sign up for our Newsletter
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Checkbox inputRef={ref => { this.betaprogram = ref; }}>
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
