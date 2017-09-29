export default class Taxonomy{
  constructor(name = '', children = []) {
    this.id = undefined 
    this.name = name
    this.children = children
    this.parent_id = undefined
    this.validationErrors = []
    this.validationState = []
    this.successMessage = undefined
    this.errorMessage = undefined
  }

  validate(){
    this.validationErrors = []
    this.validationState = []
    this.validateTextField('name')

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

  findChild(name = ''){
    const child = this.children.find((c) => c.name === name)
    console.log(`${name} = ${child}`)
    return child
  }

  addChild(name = ''){
    const child = new Taxonomy(name)
    child.parent_id = this.id
    this.children = this.children ? this.children : []
    this.children.push(child)
    return child
  }

}
