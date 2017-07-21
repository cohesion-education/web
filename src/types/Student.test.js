import Student from './Student'


describe("Student type", () => {

  it('validates without errors with all fields set to valid values', () => {
    const student = new Student('name', 'grade', 'school', 1)
    expect(student.validate()).toBeTruthy()
    expect(student.validationErrors.length).toBe(0)
    expect(student.validationState['name']).toBe('success')
    expect(student.validationState['grade']).toBe('success')
    expect(student.validationState['school']).toBe('success')
  })

  it('validates with errors with all fields empty', () => {
    const student = new Student()
    expect(student.validate()).toBeFalsy()
    expect(student.validationErrors.length).toBe(3)
    expect(student.validationState['name']).toBe('error')
    expect(student.validationState['grade']).toBe('error')
    expect(student.validationState['school']).toBe('error')
  })

})
