import { combineReducers } from 'redux'
import { loginReducer, logoutReducer } from './login'
import { statusReducer } from './status'
import { signupReducer } from './signup'
import { getBearerReducer } from './bearer'
import { forgotPassowrdReducer } from './forgot'
import { getUserReducer, activateReducer, approveReducer } from './user'

const rootReducer = combineReducers({
  login: loginReducer,
  logout: logoutReducer,
  status: statusReducer,
  signup: signupReducer,
  forgot: forgotPassowrdReducer,
  bearer: getBearerReducer,
  getUser: getUserReducer,
  approve: approveReducer,
  activate: activateReducer
})

export default rootReducer
