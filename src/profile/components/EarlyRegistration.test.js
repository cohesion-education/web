import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import EarlyRegistration from './EarlyRegistration'
import Profile from '../../types/Profile'
import { fetchProfile, handlePreferencesUpdate, savePreferences } from '../actions'

jest.mock('../actions', () => ({
  fetchProfile: jest.fn(),
  handlePreferencesUpdate: jest.fn(),
  savePreferences: jest.fn()
}))

describe("<EarlyRegistration /> Container", () => {
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
      <EarlyRegistration />
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it("starts off with empty state", () => {
    expect(wrapper.find('PageHeader').text()).toBe('Welcome to Cohesion Education')
    expect(wrapper.find('Alert').length).toBe(0)
  })

  it("clicking checkboxes causes handlePreferencesUpdate to be invoked", () => {
    expect(handlePreferencesUpdate.mock.calls.length).toBe(0)
    wrapper.find('[name="newsletter"]').simulate('click')
    expect(handlePreferencesUpdate.mock.calls.length).toBe(1)
  })

  it("clicking save causes savePreferences to be invoked", () => {
    expect(savePreferences.mock.calls.length).toBe(0)
    wrapper.find('button.btn').simulate('click')
    expect(savePreferences.mock.calls.length).toBe(1)
  })
})
