import Student from './Student'
const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

export default class Profile{
  constructor(name='', email='', state='', county='', students = []) {
    this.name = name
    this.email = email
    this.state = state
    this.county = county

    this.preferences = {
      newsletter: false,
      beta_program: false,
    }

    this.students = students

    this.onboarded = false
    this.trial_start = null
    this.billing_status = null
    this.in_trial = false
    this.days_remaining_in_trial = 0

    this.validationErrors = []
    this.validationState = []
    this.successMessage = null
    this.errorMessage = null
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

  addStudent(name, grade, school, id){
    this.students.push(new Student(name, grade, school, id))
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
      if(val === undefined){
        return false
      }

      let valid = (val !== "")
      // console.log(`${key}=${val} valid? ${valid}`)
      return valid
    })
  }

  validateEmailField(key){
    return this.validateInput(key, (val) => {
      if(val === undefined){
        return false
      }

      return emailRegex.test(val) === true
    })
  }

}
