import { combineReducers } from 'redux'
import { authReducer } from './auth'
import { statusReducer } from './status'

const rootReducer = combineReducers({
  auth: authReducer,
  status: statusReducer
})

export default rootReducer
