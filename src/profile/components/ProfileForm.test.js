import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import ProfileForm from './ProfileForm'
import Profile from '../../types/Profile'
import { fetchProfile, handleProfileUpdate, saveProfile } from '../actions'

jest.mock('../actions', () => ({
  fetchProfile: jest.fn(),
  handleProfileUpdate: jest.fn(),
  saveProfile: jest.fn()
}))

describe("<ProfileForm /> Container", () => {

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      profile: new Profile()
    }))
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <ProfileForm />
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it("starts off with empty state", () => {
    expect(wrapper.find('PageHeader').text()).toBe('My Profile')
    expect(wrapper.find('Alert').length).toBe(0)
  })

  it("clicking save causes saveProfile to be invoked", () => {
    expect(saveProfile.mock.calls.length).toBe(0)
    wrapper.find('button.btn').simulate('click')
    expect(saveProfile.mock.calls.length).toBe(1)
  })
})
