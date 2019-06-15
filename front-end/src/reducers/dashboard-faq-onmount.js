import { handleActions } from 'redux-actions';

const initialState = {
    originalData: {},
    displayedData: {},
    fetching: false,
    error: false,
};

export const dashboardFaqOnMountReducer = handleActions({
    "DASHBOARD_FAQ_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_FAQ_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_FAQ_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

