import { mount } from 'enzyme'
import { StudentsForm } from './StudentsForm'
import Profile from '../../types/Profile'
import Student from '../../types/Student'

const _fetchStudents = jest.fn()
const _handleSave = jest.fn()


describe("<StudentsForm /> Container", () => {
  const _students = new Array()
  _students.push(new Student('Billy', '3', 'Treasure Island', 3))
  _students.push(new Student('Sally', '1', 'Treasure Island', 1))

  let wrapper

  beforeAll(() => wrapper = mount(
    <StudentsForm
      students={_students}
      fetchStudents={_fetchStudents}
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

  // it("clicking add causes handleStudentAdd to be invoked", () => {
  //   expect(_handleStudentAdd.mock.calls.length).toBe(0)
  //   wrapper.find('#add').simulate('click')
  //   expect(_handleStudentAdd.mock.calls.length).toBe(1)
  // })
})
