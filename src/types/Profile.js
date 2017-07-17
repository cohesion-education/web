const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

export default class Profile{
  constructor(name, email, state, county) {
    this.name = name
    this.email = email
    this.state = state
    this.county = county
    this.validationErrors = []
    this.validationState = []
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('name')
    this.validateEmailField('email')
    this.validateTextField('state')
    this.validateTextField('county')
    // console.log(`validation state: ${JSON.stringify(this.validationErrors)}`)
    return this.validationErrors.length === 0
  }

  validateInput(key, validator){
    if(validator(this[key]) !== true){
      this.validationErrors.push({fieldName:key, valid:false})
      this.validationState[key] = 'error'
      return
    }

    this.validationState[key] = 'success'
  }

  validateTextField(key){
    return this.validateInput(key, (val) => {
      let valid = (val !== "")
      // console.log(`${key} valid? ${valid}`)
      return valid
    })
  }

  validateEmailField(key){
    return this.validateInput(key, (val) => {
      return emailRegex.test(val) === true
    })
  }
}
