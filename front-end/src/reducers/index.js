import {combineReducers} from 'redux';
import reduceReducers from 'reduce-reducers';
import auth from './auth';
import statements from './statements'

const allReducers = combineReducers({
    admin: reduceReducers(statements, auth),
    statements,
    auth
});

export default allReducers