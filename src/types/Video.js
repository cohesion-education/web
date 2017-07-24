import Profile from './Profile'
import Taxonomy from './Taxonomy'


export default class Video{
  constructor(id, title, createdBy = new Profile(), taxonomy = new Taxonomy()) {
    this.id = id
    this.title = title
    this.createdBy = createdBy
    this.taxonomy = taxonomy
    this.validationErrors = []
    this.validationState = []
    this.successMessage = null
    this.errorMessage = null
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('title')

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
      if(val === undefined){
        return false
      }

      let valid = (val !== "")
      // console.log(`${key}=${val} valid? ${valid}`)
      return valid
    })
  }
}
