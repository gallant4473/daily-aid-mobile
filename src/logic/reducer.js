import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './login'
import { statusReducer } from './status'
import { signupReducer } from './signup'
import { getBearerReducer } from './bearer'
import { forgotPassowrdReducer } from './forgot'
import { getUserReducer, activateReducer, approveReducer } from './user'
import {
  addComplaintReducer,
  getAllComplaintReducer,
  getComplaintReducer,
  deleteComplaintReducer,
  editComplaintReducer
} from './complaint'

import {
  addAnnouncementReducer,
  getAllAnnouncementReducer,
  getAnnouncementReducer,
  deleteAnnouncementReducer,
  editAnnouncementReducer
} from './announcements'

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  status: statusReducer,
  signup: signupReducer,
  forgot: forgotPassowrdReducer,
  bearer: getBearerReducer,
  getUser: getUserReducer,
  approve: approveReducer,
  activate: activateReducer,
  addComplaint: addComplaintReducer,
  getAllComplaint: getAllComplaintReducer,
  getComplaint: getComplaintReducer,
  deleteComplaint: deleteComplaintReducer,
  editComplaint: editComplaintReducer,
  addAnnouncement: addAnnouncementReducer,
  getAllAnnouncement: getAllAnnouncementReducer,
  getAnnouncement: getAnnouncementReducer,
  deleteAnnouncement: deleteAnnouncementReducer,
  editAnnouncement: editAnnouncementReducer
})

export default rootReducer
