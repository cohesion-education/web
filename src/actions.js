import { RECEIVE_PROFILE } from './constants'

export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile:profile,
    receivedAt: Date.now()
  }
}
