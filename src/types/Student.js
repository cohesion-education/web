export default class Student{
  constructor(name, grade, school, id) {
    this.name = name
    this.grade = grade
    this.school = school
    this.id = id
    this.validationErrors = []
    this.validationState = []
    this.successMessage = null
    this.errorMessage = null
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('name')
    this.validateTextField('grade')
    this.validateTextField('school')
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
      if(val === undefined){
        return false
      }

      let valid = (val !== "")
      return valid
    })
  }

  toString(){
    return JSON.stringify(this)
  }
}
