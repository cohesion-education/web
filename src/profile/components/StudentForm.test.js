import { mount } from 'enzyme'
import StudentForm from './StudentForm'
import Student from '../../types/Student'

const _handleStudentUpdate = jest.mock()
const _handleStudentRemoval = jest.mock()

it('renders without crashing', () => {
  let student = new Student('Billy', '3', 'Washington Elementary', 1)

  const wrapper = mount(
    <StudentForm
      student={student}
      handleStudentUpdate={_handleStudentUpdate}
      handleStudentRemoval={_handleStudentRemoval}
    />
  )

  expect(wrapper
    .props()
    .student
  ).toBe(student)

  expect(wrapper
    .find('FormGroup')
    .length
  ).toBe(3)

  expect(wrapper
    .find('FormGroup')
    .first()
    .text()
  ).toBe('Name')

  expect(wrapper
    .find('FormControl')
    .first()
    .props()
    .value
  ).toBe('Billy')

  expect(wrapper
    .find('FormGroup')
    .first()
    .props()
    .validationState
  ).toBeUndefined()

  expect(wrapper
    .find('FormGroup')
    .last()
    .text()
  ).toBe('School')
})

it('renders correct validation state', () => {
  let student = new Student('', '3', '', 1)
  student.validate()

  const wrapper = mount(
    <StudentForm
      student={student}
      handleStudentUpdate={_handleStudentUpdate}
      handleStudentRemoval={_handleStudentRemoval}
    />
  )

  expect(wrapper
    .props()
    .student
  ).toBe(student)

  expect(wrapper
    .find('FormGroup')
    .length
  ).toBe(3)

  expect(wrapper
    .find('FormGroup')
    .first()
    .text()
  ).toBe('Name')

  expect(wrapper
    .find('FormControl')
    .first()
    .props()
    .value
  ).toBe('')

  expect(wrapper
    .find('FormGroup')
    .first()
    .props()
    .validationState
  ).toBe('error')

  expect(wrapper
    .find('FormControl')
    .last()
    .props()
    .value
  ).toBe('')

  expect(wrapper
    .find('FormGroup')
    .last()
    .props()
    .validationState
  ).toBeUndefined()
})
