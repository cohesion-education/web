import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'

const styles = {
  formField:{
    height: '34px',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    color: '#555',
  },
}

const stripe = window.Stripe('pk_test_DbiImCco0ZbhKMahmOLJE7eV')
const elements = stripe.elements()
//const card = elements.create('card')
const cardNumber = elements.create('cardNumber')
const cardExpiry = elements.create('cardExpiry')
const cardCvc = elements.create('cardCvc')
const postalCode = elements.create('postalCode')

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      'name': '',
      'address_line1': '',
      'address_line2': '',
      'address_city': '',
      'address_state': '',
      'address_zip': '',
      'address_country': 'US',
      'currency': 'usd'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // Add an instance of the card Element into the `card-element` <div>

    cardNumber.mount('#card-number-element')
    cardExpiry.mount('#card-expiry-element')
    cardCvc.mount('#card-cvc-element')
    postalCode.mount('#card-postal-code-element')

    const creditCardElementOnChangeListener = ({error}) => {
      const displayError = document.getElementById('card-errors')
        if (error) {
          displayError.textContent = error.message
        } else {
          displayError.textContent = ''
        }
    }

    cardNumber.addEventListener('change', creditCardElementOnChangeListener)
    cardExpiry.addEventListener('change', creditCardElementOnChangeListener)
    cardCvc.addEventListener('change', creditCardElementOnChangeListener)
    postalCode.addEventListener('change', creditCardElementOnChangeListener)
  }

  handleInputChange(prop, val){
    const next = Object.assign(this.state)
    next[prop] = val
    this.setState(next)
  }

  handleSubmit(e){
    e.preventDefault()

    console.log(`card data: ${JSON.stringify(this.state)}`)

    stripe.createToken(cardNumber, this.state).then(function(result) {
      if (result.error) {
        // Inform the user if there was an error
        var errorElement = document.getElementById('card-errors')
        errorElement.textContent = result.error.message
      } else {
        // Send the token to your server
        console.log(`token: ${JSON.stringify(result.token)}`)
      }
    })
  }

  render(){

    return(
      <div>
        <PageHeader>Payment Details</PageHeader>
        <Alert id="card-errors" bsStyle="warning"></Alert>
        <Form onSubmit={this.handleSubmit} horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Name</Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Jane Doe"
                onChange={(e) => { this.handleInputChange('name', e.target.value) }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Address Line 1</Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="555 Cohesion Ed Dr."
                onChange={(e) => { this.handleInputChange('address_line1', e.target.value) }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Address Line 2</Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder=""
                onChange={(e) => { this.handleInputChange('address_line2', e.target.value) }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>City</Col>
            <Col sm={10}>
              <FormControl
                type="text"
                placeholder="Islamorada"
                onChange={(e) => { this.handleInputChange('city', e.target.value) }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>State</Col>
            <Col sm={10}>
              <FormControl
                componentClass='select'
                name='state'
                placeholder='State'
              >
                <option value=''>State</option>
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='PR'>Puerto Rico</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Postal Code</Col>
            <Col sm={10}>
              <div style={styles.formField} id="card-postal-code-element"></div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Credit or debit card</Col>
            <Col sm={10}>
              <div style={styles.formField} id="card-number-element"></div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Expiration Date</Col>
            <Col sm={10}>
              <div style={styles.formField} id="card-expiry-element"></div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>CVC</Col>
            <Col sm={10}>
              <div style={styles.formField} id="card-cvc-element"></div>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit' bsStyle='primary' onClick={this.handleSubmit}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
