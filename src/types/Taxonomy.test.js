import Taxonomy from './Taxonomy'


describe("Taxonomy type", () => {

  it('validates without errors with all fields set to valid values', () => {
    const taxonomy = new Taxonomy(1, 'name')
    expect(taxonomy.validate()).toBeTruthy()
    expect(taxonomy.validationErrors.length).toBe(0)
    expect(taxonomy.validationState['name']).toBe('success')
  })

  it('validates with errors with all fields empty', () => {
    const taxonomy = new Taxonomy()
    expect(taxonomy.validate()).toBeFalsy()
    expect(taxonomy.validationErrors.length).toBe(1)
    expect(taxonomy.validationState['name']).toBe('error')
  })

})
