import { handleActions } from 'redux-actions';

const initialState = {
    data: [],
    fetching: false,
    error: false,
};

export const resourcesReducer = handleActions({
    "RESOURCES_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "RESOURCES_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.payload,
            error: false,
        };
    },
    "RESOURCES_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

