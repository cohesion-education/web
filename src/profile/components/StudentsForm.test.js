import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import StudentsForm from './StudentsForm'
import Profile from '../../types/Profile'
import Student from '../../types/Student'
import { fetchProfile, handleStudentAdd, handleStudentUpdate, handleStudentRemove, saveProfile } from '../actions'

jest.mock('../actions', () => ({
  fetchProfile: jest.fn(),
  handleStudentAdd: jest.fn(),
  handleStudentUpdate: jest.fn(),
  handleStudentRemove: jest.fn(),
  saveProfile: jest.fn()
}))

describe("<StudentsForm /> Container", () => {

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => {
      const profile = new Profile()
      profile.addStudent('Billy', '3', 'Treasure Island')
      profile.addStudent('Sally', '1', 'Treasure Island')
      return {
        profile: profile
      }
    })
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <StudentsForm />
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it("starts off with empty state", () => {
    expect(wrapper.find('PageHeader').text()).toBe('My Students')
    expect(wrapper.find('Alert').length).toBe(0)
    expect(wrapper.find('Form').length).toBe(1)
    expect(wrapper.find('StudentForm').length).toBe(2)
  })

  it("clicking add causes handleStudentAdd to be invoked", () => {
    expect(handleStudentAdd.mock.calls.length).toBe(0)
    wrapper.find('#add').simulate('click')
    expect(handleStudentAdd.mock.calls.length).toBe(1)
  })
})
