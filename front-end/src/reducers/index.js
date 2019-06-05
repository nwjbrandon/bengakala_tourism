import {combineReducers} from 'redux';
import authUserReducer from './auth';

const allReducers = combineReducers({
    auth: authUserReducer,
});

export default allReducers