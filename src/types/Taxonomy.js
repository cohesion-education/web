export default class Taxonomy{
  constructor(id =  -1, name = '', parent = null, children = []) {
    this.id = id
    this.name = name
    this.parent = parent
    this.children = children
    this.validationErrors = []
    this.validationState = []
    this.successMessage = null
    this.errorMessage = null
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('name')

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

  addChild(name = '', id = -1){
    const child = new Taxonomy(id, name, this)
    this.children.push(child)
    return child
  }

}
