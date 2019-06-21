import {handleActions} from 'redux-actions';
import _omit from 'lodash/omit';
import _cloneDeep from 'lodash/cloneDeep';

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
    "DASHBOARD_SETTINGS_DELETE": (state, action) => {
        const { id, type } = action.payload;
        const { displayedData } = _cloneDeep(state);
        displayedData[type] = _omit(displayedData[type], id);
        return {
            ...state,
            displayedData: displayedData
        };
    },
    "DASHBOARD_SETTINGS_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_SETTINGS_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
}, initialState);

