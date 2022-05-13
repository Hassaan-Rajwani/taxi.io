import userReducer from './user/userReducer';
import driverReducer from './driver/driverReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    userReducer,
    driverReducer
})