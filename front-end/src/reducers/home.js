import { handleActions } from 'redux-actions';

const initialState = {
    data: {
        stories: [],
        mission: "",
    },
    fetching: false,
    error: false,
};

export const homeOnMountReducer = handleActions({
    "HOME_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "HOME_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.payload,
            error: false,
        };
    },
    "HOME_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

