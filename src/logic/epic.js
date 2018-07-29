import { combineEpics } from 'redux-observable'

import { signupEpic } from './signup'
import { loginEpic, logoutEpic } from './login'
import { forgotPasswordEpic } from './forgot'
import { getUserEpic, approveEpic, activateEpic } from './user'
import { addComplaintEpic, getComplaintEpic, deleteComplaintEpic, editComplaintEpic, getAllComplaintEpic } from './complaint'

const rootEpic = combineEpics(
  loginEpic,
  logoutEpic,
  signupEpic,
  forgotPasswordEpic,
  getUserEpic,
  approveEpic,
  activateEpic,
  addComplaintEpic,
  getComplaintEpic,
  deleteComplaintEpic,
  editComplaintEpic,
  getAllComplaintEpic
)

export default rootEpic
