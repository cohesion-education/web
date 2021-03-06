import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import Profile from '../types/Profile'
import Student from '../types/Student'
import * as actions from './actions'
import * as constants from './constants'

window.config = {
  api_base: 'http://localhost:3000'
}

localStorage.setItem('id_token', 'test-token')

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("saveProfile action", () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('does not call api when there are validation errors but dispatches profile with error message and validation errors', () => {
    const errorMessage = 'Oops! Looks like you\'re missing some information'
    const validationErrors = [
      {fieldName: 'name', valid:false},
      {fieldName: 'email', valid:false},
      {fieldName: 'state', valid:false},
      {fieldName: 'county', valid:false},
    ]
    const store = mockStore({ profile: null })
    const sentProfile = new Profile()

    store.dispatch(actions.saveProfile(sentProfile))

    const receiveProfileAction = store.getActions()[0]
    expect(receiveProfileAction.type).toBe(constants.RECEIVE_PROFILE)
    expect(receiveProfileAction.profile.errorMessage).toBe(errorMessage)
    expect(receiveProfileAction.profile.validationErrors).toEqual(validationErrors)
  })

  it('after previous validation failure and with all valid information, clears error message, calls api, and dispatches updated profile with success messsage', () => {
    const successMessage = 'Your profile has been updated'
    const previousErrorMessage = 'Oops! Looks like you\'re missing some information'
    const previousValidationErrors = [
      {fieldName: 'name', valid:false},
      {fieldName: 'email', valid:false},
      {fieldName: 'state', valid:false},
      {fieldName: 'county', valid:false},
    ]

    const sentProfile = new Profile('Hello', 'hello@domain.com', 'FL', 'Monroe County')
    sentProfile.errorMessage = previousErrorMessage
    sentProfile.validationErrors = previousValidationErrors

    nock('http://localhost:3000')
      .put('/api/profile')
      .reply(200, { body: { profile: sentProfile } })

    const store = mockStore({ profile: sentProfile })

    return store.dispatch(actions.saveProfile(sentProfile)).then(() => {
      // return of async actions
      const invalidateProfileAction = store.getActions()[0]
      expect(invalidateProfileAction.type).toBe(constants.INVALIDATE_PROFILE)

      const receiveProfileAction = store.getActions()[1]
      expect(receiveProfileAction.type).toBe(constants.RECEIVE_PROFILE)
      expect(receiveProfileAction.profile.successMessage).toBe(successMessage)
      expect(receiveProfileAction.profile.validationErrors).toEqual([])
      expect(receiveProfileAction.profile.errorMessage).toBeNull()
    })

  })

})

// describe("handleStudentAdd action", () => {
//   it('should add an empty student and create a receiveProfile action', () => {
//     const profile = new Profile()
//     const result = actions.handleStudentAdd(profile)
//     expect(result.type).toBe(constants.RECEIVE_PROFILE)
//     expect(result.profile.students.length).toBe(1)
//     expect(profile.students.length).toBe(0)
//   })
// })
//
// describe("handleStudentUpdate action", () => {
//   const profile = new Profile()
//   const student = new Student('Billy', '4th', 'Mintz Elementary', 1)
//   profile.students.push(student)
//   const result = actions.handleStudentUpdate(profile, student, 'name', 'Bill')
//   expect(result.type).toBe(constants.RECEIVE_PROFILE)
//   expect(result.profile.students.length).toBe(1)
//   expect(profile.students.length).toBe(1)
//   expect(result.profile.students[0].name).toBe('Bill')
//   expect(profile.students[0].name).toBe('Billy')
// })
//
// describe("handleStudentRemove action", () => {
//   it('should remove student by id and create a receiveProfile action', () => {
//     const profile = new Profile()
//     const student = new Student('Billy', '4th', 'Mintz Elementary', 1)
//     profile.students.push(student)
//     const result = actions.handleStudentRemove(profile, student)
//     expect(result.type).toBe(constants.RECEIVE_PROFILE)
//     expect(result.profile.students.length).toBe(0)
//     expect(profile.students.length).toBe(1)
//   })
// })
