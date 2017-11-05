import { mount } from 'enzyme'
import { StudentsForm } from './StudentsForm'
import Profile from '../../types/Profile'
import Student from '../../types/Student'

const _fetchStudents = jest.fn()
const _handleStudentAdd = jest.fn()
const _handleStudentUpdate = jest.fn()
const _handleStudentRemove = jest.fn()
const _handleSave = jest.fn()


describe("<StudentsForm /> Container", () => {
  const _profile = new Profile()
  _profile.addStudent('Billy', '3', 'Treasure Island')
  _profile.addStudent('Sally', '1', 'Treasure Island')

  let wrapper

  beforeAll(() => wrapper = mount(
    <StudentsForm
      profile={_profile}
      fetchStudents={_fetchStudents}
      handleStudentUpdate={_handleStudentUpdate}
      handleStudentAdd={_handleStudentAdd}
      handleStudentRemove={_handleStudentRemove}
      handleSave={_handleSave}
    />
  ))
  afterEach(() => jest.resetAllMocks())

  it("starts off with empty state", () => {
    expect(wrapper.find('PageHeader').text()).toBe('My Students')
    expect(wrapper.find('Alert').length).toBe(0)
    expect(wrapper.find('Form').length).toBe(1)
    expect(wrapper.find('StudentForm').length).toBe(2)
  })

  it("clicking add causes handleStudentAdd to be invoked", () => {
    expect(_handleStudentAdd.mock.calls.length).toBe(0)
    wrapper.find('#add').simulate('click')
    expect(_handleStudentAdd.mock.calls.length).toBe(1)
  })
})
