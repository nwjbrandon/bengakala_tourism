import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';

const allReducers = combineReducers({
    admin: reduceReducers(auth)
});

export default allReducers