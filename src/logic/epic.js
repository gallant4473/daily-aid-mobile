import { combineEpics } from 'redux-observable'

import { loginEpic, logoutEpic } from './auth'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic
)

export default rootEpic
