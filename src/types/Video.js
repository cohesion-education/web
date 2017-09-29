export default class Video{
  constructor() {
    this.id = undefined
    this.Key = undefined

    this.title = undefined
    this.taxonomy_id = undefined
    this.state_standards = []
    this.common_core_standards = []
    this.key_terms = []

    this.file = undefined
    this.file_name = undefined
    this.file_type = undefined
    this.file_size = undefined

    this.bucket = undefined
    this.object_name = undefined
    this.signed_url = undefined

    this.created = new Date()
    this.created_by = undefined
    this.updated = undefined
    this.updated_by = undefined


    this.validationErrors = []
    this.validationState = []
    this.successMessage = undefined
    this.errorMessage = undefined
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('title')
    
    if(!this.taxonomy_id){
      this.validationErrors.push({fieldName:'taxonomy_id', valid:false})
      this.validationState['taxonomy_id'] = 'error'
    }else{
      this.validationState['taxonomy_id'] = 'success'
    }

    if(!this.id && !this.file){
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
