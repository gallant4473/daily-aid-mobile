import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { setAsync, getAsync, removeAsync, apiCall } from '../utils'
import { ERROR } from './status'

// Constants

const LOGIN = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const LOGOUT_FAILURE = 'LOGOUT_FAILURE'
const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  loggedIn: getAsync('accessToken')
}

// Login action
export const loginAction = payload => ({
  type: LOGIN,
  payload
})

// Logout action
export const logoutAction = payload => ({
  type: LOGOUT,
  payload
})

// Login Success action
const loginSuccess = payload => ({
  type: LOGIN_SUCCESS,
  payload
})

// Logout success action
const logoutSuccess = payload => ({
  type: LOGOUT_SUCCESS,
  payload
})

// Login epic
export const loginEpic = action$ => action$
  .ofType(LOGIN)
  .mergeMap(action => staticAjax(apiCall(`${process.env.baseUrl}api/v0/auth/register`, 'POST', false, action.payload))
    .map(response => loginSuccess(response))
    .catch(error => Observable.of({
      type: LOGIN_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Logout epic
export const logoutEpic = action$ => action$
  .ofType(LOGOUT)
  .mergeMap(action => staticAjax(apiCall(`${process.env.baseUrl}api/v0/auth/logout`, 'DELETE'))
    .map(response => logoutSuccess(response))
    .catch(error => Observable.of({
      type: LOGOUT_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// Auth reducer updates both login and logout
export function authReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        loggedIn: false
      }
    }
    case LOGIN_SUCCESS: {
      const error = setAsync('auth', action.payload.response.data)
      return {
        ...state,
        data: action.payload.response.data,
        loading: false,
        error,
        loggedIn: true
      }
    }
    case LOGOUT_SUCCESS: {
      removeAsync('auth')
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        loggedIn: false
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        loggedIn: false
      }
    }
    case LOGOUT_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        loggedIn: false
      }
    }
    default:
      return state
  }
}
