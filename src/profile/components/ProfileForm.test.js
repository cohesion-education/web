import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { ProfileForm } from './ProfileForm'
import Profile from '../../types/Profile'

const _fetchProfileIfNeeded = jest.fn()
const _saveProfile = jest.fn()

describe("<ProfileForm /> Container", () => {
  const _profile = new Profile()

  let wrapper
  beforeAll(() => wrapper = mount(
    <ProfileForm
      profile={_profile}
      saveProfile={_saveProfile}
      fetchProfileIfNeeded={_fetchProfileIfNeeded}
    />
  ))

  afterEach(() => jest.resetAllMocks())

  it("starts off with default state - no alerts", () => {
    expect(wrapper.find('PageHeader').text()).toBe('My Profile')
    expect(wrapper.find('Alert').length).toBe(0)
  })

  it("clicking save causes saveProfile to be invoked", () => {
    expect(_saveProfile.mock.calls.length).toBe(0)
    wrapper.find('button.btn').simulate('click')
    expect(_saveProfile.mock.calls.length).toBe(1)
  })
})
