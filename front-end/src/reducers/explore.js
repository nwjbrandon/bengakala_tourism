import { handleActions } from 'redux-actions';

const initialState = {
    data: [],
    fetching: false,
    error: false,
};

export const exploreReducer = handleActions({
    "EXPLORE_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "EXPLORE_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.payload,
            error: false,
        };
    },
    "EXPLORE_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

