import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall, BASE_URL } from '../utils'
import { ERROR } from './status'

// Constants
const FORGOT_PASSWORD = 'FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

// Forgot Password action
export const forgotPasswordAction = payload => ({
  type: FORGOT_PASSWORD,
  payload
})

// Forgot Password Success action
const forgotPasswordSuccess = payload => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload
})

// Forgot Passowrd epic
export const forgotPasswordEpic = action$ => action$
  .ofType(FORGOT_PASSWORD)
  .mergeMap(action => staticAjax(apiCall(`${BASE_URL}api/v0/auth/forgot_password`, 'POST', false, action.payload))
    .map(response => forgotPasswordSuccess(response))
    .catch(error => Observable.of({
      type: FORGOT_PASSWORD_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Forgot Password reducer
export function forgotPassowrdReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FORGOT_PASSWORD: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: [action.payload.response.data],
        loading: false,
        error: false
      }
    }
    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}
