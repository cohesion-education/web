import Profile from './Profile'


describe("Profile type", () => {

  it('validates without errors with all fields set to valid values', () => {
    const profile = new Profile('name', 'hello@cohesioned.io', 'FL', 'Monroe County')
    expect(profile.validate()).toBeTruthy()
    expect(profile.validationErrors.length).toBe(0)
    expect(profile.validationState['name']).toBe('success')
    expect(profile.validationState['email']).toBe('success')
    expect(profile.validationState['state']).toBe('success')
    expect(profile.validationState['county']).toBe('success')
  })

  it('validates with errors with all fields empty', () => {
    const profile = new Profile()
    expect(profile.validate()).toBeFalsy()
    expect(profile.validationErrors.length).toBe(4)
    expect(profile.validationState['name']).toBe('error')
    expect(profile.validationState['email']).toBe('error')
    expect(profile.validationState['state']).toBe('error')
    expect(profile.validationState['county']).toBe('error')
  })

})
