import { combineEpics } from 'redux-observable'

import { signupEpic } from './signup'
import { loginEpic, logoutEpic } from './login'
import { forgotPasswordEpic } from './forgot'
import { getUserEpic, approveEpic, activateEpic } from './user'
import { addComplaintEpic, getComplaintEpic, deleteComplaintEpic, editComplaintEpic, getAllComplaintEpic } from './complaint'
import { addAnnouncementEpic, getAnnouncementEpic, deleteAnnouncementEpic, editAnnouncementEpic, getAllAnnouncementEpic } from './announcements'

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
  getAllComplaintEpic,
  addAnnouncementEpic,
  getAnnouncementEpic,
  deleteAnnouncementEpic,
  editAnnouncementEpic,
  getAllAnnouncementEpic
)

export default rootEpic
