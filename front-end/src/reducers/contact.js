import { handleActions } from 'redux-actions';

const initialState = {
    data: {},
    fetching: false,
    error: false,
    successMsg: '',
    errorMsg: '',
};

export const contactReducer = handleActions({
    "CONTACT_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "CONTACT_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.payload,
            error: false,
        };
    },
    "CONTACT_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "CONTACT_FORM_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
            errorMsg: '',
            successMsg: '',
        };
    },
    "CONTACT_FORM_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: false,
            errorMsg: '',
            successMsg: action.payload.message
        };
    },
    "CONTACT_FORM_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: true,
            errorMsg: action.payload,
            successMsg: '',
        };
    },
}, initialState);

