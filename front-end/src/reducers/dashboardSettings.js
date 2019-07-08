import { handleActions } from 'redux-actions';

const initialState = {
    originalData: {
        editable: {},
        uneditable: {},
    },
    displayedData: {
        editable: {},
        uneditable: {},
    },
    fetching: false,
    error: false,
};

export const dashboardSettingsReducer = handleActions({
    "DASHBOARD_SETTINGS_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_SETTINGS_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_SETTINGS_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_SETTINGS_DELETE_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_DELETE_SUCCESS": (state) => {
        return {
            ...state,
            fetching: false,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_DELETE_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_SETTINGS_CREATE_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_CREATE_SUCCESS": (state) => {
        return {
            ...state,
            fetching: false,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_CREATE_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_SETTINGS_CHANGE_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_CHANGE_SUCCESS": (state) => {
        return {
            ...state,
            fetching: false,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_CHANGE_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
}, initialState);

