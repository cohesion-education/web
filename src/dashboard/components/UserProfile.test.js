import { mount } from 'enzyme'
import Profile from '../../types/Profile'
import UserProfile from './UserProfile'
import { updateProfile } from '../actions'
jest.mock('../../utils/Auth')

window.config = {
  api_base:"http://localhost:3000",
}

describe("<UserProfile /> UI Component", () => {
  jest.mock('../actions', () => ({ updateProfile: jest.fn().mockImplementation(() => console.log('updateProfile.mockImplementation') )}))
  // updateProfile.mockImplementation(() => console.log('updateProfile.mockImplementation'))

  let wrapper
  let instance

  beforeAll(() => {
    wrapper = mount(<UserProfile />)
    instance = wrapper.instance()
  })

  it("starts off with empty state", () => {
    expect(instance.state.profile).toBeDefined()
    expect(instance.state.profile.name).toBeUndefined()
    expect(instance.state.profile.email).toBeUndefined()
    expect(instance.state.profile.state).toBeUndefined()
    expect(instance.state.profile.county).toBeUndefined()
    expect(instance.state.error).toBeNull()
    expect(instance.state.successMessage).toBeNull()
  })

  it("clicking save without valid values results in error <Alert />", () => {
    wrapper.find('button.btn').simulate('click')

    // expect(_handleSubmit).toBeCalled()
    expect(instance.state.profile.validate()).toBeFalsy()
    expect(instance.state.error).toBe("Oops! Looks like you're missing some information")
    expect(instance.state.successMessage).toBeNull()
    expect(wrapper.find('div.alert-warning').length).toBe(1)
    expect(wrapper.find('div.alert-success').length).toBe(0)
    // expect(updateProfile).toBeCalled()
  })

  it("clicking save with valid values results in success <Alert />", () => {
    wrapper.setState({ profile:new Profile('Satisfied Parent', 'test@cohesioned.io','FL', 'Monroe')})
    console.log(`state: ${JSON.stringify(instance.state)}`)
    expect(instance.state.profile.name).toBe('Satisfied Parent')
    expect(instance.state.profile.email).toBe('test@cohesioned.io')
    expect(instance.state.profile.state).toBe('FL')
    expect(instance.state.profile.county).toBe('Monroe')
    wrapper.find('button.btn').simulate('click')

    expect(instance.state.profile.validate()).toBeTruthy()
    expect(instance.state.error).toBeNull()
    expect(instance.state.successMessage).toBe("Your profile has been updated")
    expect(wrapper.find('div.alert-warning').length).toBe(0)
    expect(wrapper.find('div.alert-success').length).toBe(1)
    // expect(updateProfile).toBeCalled()
  })

})
