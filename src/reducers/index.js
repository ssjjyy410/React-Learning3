import {combineReducers} from 'redux'

import notifications from './notifications'
import users from './users'

export default combineReducers({
    notifications,
    users
})
