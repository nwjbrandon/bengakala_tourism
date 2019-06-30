import { handleActions } from 'redux-actions';

const initialState = {
    fetching: false,
    error: false,
    successMsg: '',
    errorMsg: '',
};

export const contactFormReducer = handleActions({
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
            errorMsg: action.payload.data.error.message,
            successMsg: '',
        };
    },
}, initialState);

