import { combineEpics } from 'redux-observable'

import { signupEpic } from './signup'
import { loginEpic, logoutEpic } from './login'
import { forgotPasswordEpic } from './forgot'
import { getUserEpic, approveEpic, activateEpic } from './user'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  signupEpic,
  forgotPasswordEpic,
  getUserEpic,
  approveEpic,
  activateEpic
)

export default rootEpic
