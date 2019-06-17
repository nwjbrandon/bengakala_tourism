import { handleActions } from 'redux-actions';

const initialState = {
    auth: false,
    fetching: false,
    error: false,
};

export const adminLoginReducer = handleActions({
    "ADMIN_LOGIN_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
            auth: false,
        };
    },
    "ADMIN_LOGIN_SUCCESS": (state) => {
        return {
            ...state,
            fetching: false,
            error: false,
            auth: true,
        };
    },
    "ADMIN_LOGIN_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
            auth: false,
        };
    },
}, initialState);

