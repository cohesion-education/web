export default class Video{
  constructor(title, createdBy, taxonomy) {
    this.title = title
    this.createdBy = createdBy
    this.taxonomy = taxonomy
    this.file = null
    this.stateStandards = []
    this.commonCoreStandards = []
    this.keyTerms = []
    this.validationErrors = []
    this.validationState = []
    this.successMessage = null
    this.errorMessage = null
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('title')
    this.validateTextField('taxonomy')
    if(!this.file){
      this.validationErrors.push({fieldName:'file', valid:false})
      this.validationState['file'] = 'error'
    }else{
      this.validationState['file'] = 'success'
    }

    console.log(`validation state: ${JSON.stringify(this.validationErrors)}`)
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
