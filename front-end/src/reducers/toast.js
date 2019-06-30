import { handleActions } from 'redux-actions';

const initialState = {
    success_msg: '',
    success_open: false,
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
}, initialState);

