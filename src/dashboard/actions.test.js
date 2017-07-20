import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import Profile from '../types/Profile'
import * as actions from './actions'
import * as constants from './constants'

window.config={
  api_base:'http://testing'
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

    const receivedAction = store.getActions()[0]
    expect(receivedAction.type).toBe(constants.RECEIVE_PROFILE)
    expect(receivedAction.profile.errorMessage).toBe(errorMessage)
    expect(receivedAction.profile.validationErrors).toEqual(validationErrors)
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

    nock(window.config.api_base)
      .post('/api/profile')
      .reply(200, { body: { profile: sentProfile } })

    const store = mockStore({ profile: sentProfile })

    return store.dispatch(actions.saveProfile(sentProfile)).then(() => {
      // return of async actions
      const receivedAction = store.getActions()[0]
      expect(receivedAction.type).toBe(constants.RECEIVE_PROFILE)
      expect(receivedAction.profile.successMessage).toBe(successMessage)
      expect(receivedAction.profile.validationErrors).toEqual([])
      expect(receivedAction.profile.errorMessage).toBeNull()
    })

  })



  // it('validates with errors with all fields empty', () => {
  //   const profile = new Profile()
  //   expect(profile.validate()).toBeFalsy()
  //   expect(profile.validationErrors.length).toBe(4)
  //   expect(profile.validationState['name']).toBe('error')
  //   expect(profile.validationState['email']).toBe('error')
  //   expect(profile.validationState['state']).toBe('error')
  //   expect(profile.validationState['county']).toBe('error')
  // })

})
