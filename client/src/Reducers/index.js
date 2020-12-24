import {combineReducers} from 'redux'
import authReducer from './AuthReducer'
import errorReducer from './ErrorReducer'
import LoginReducer from './LoginReducer'
export default combineReducers({
    auth:authReducer,
    errors:errorReducer,
    loginerrors:LoginReducer
   
})