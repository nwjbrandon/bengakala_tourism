import { handleActions } from 'redux-actions';

const initialState = {
    success_msg: '',
    success_open: false,
    error_msg: '',
    error_open: false,
};

export const toastReducer = handleActions({
    "TOAST_SUCCESS_SHOW": (state, action) => {
        return {
            ...state,
            success_msg: action.payload,
            success_open: true,
        };
    },
    "TOAST_SUCCESS_CLEAR": (state) => {
        return {
            ...state,
            success_open: false,
        };
    },
    "TOAST_ERROR_SHOW": (state, action) => {
        return {
            ...state,
            error_msg: action.payload,
            error_open: true,
        };
    },
    "TOAST_ERROR_CLEAR": (state) => {
        return {
            ...state,
            error_open: false,
        };
    },
}, initialState);

