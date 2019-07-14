import {handleActions} from 'redux-actions';
import _omit from 'lodash/omit';
import _cloneDeep from 'lodash/cloneDeep';

const initialState = {
    originalData: {
        stories: {},
        objective: {},
    },
    displayedData: {
        stories: {},
        objective: {},
    },
    fetching: false,
    error: false,
};

export const dashboardHomeReducer = handleActions({
    "DASHBOARD_HOME_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_HOME_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_HOME_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_HOME_DELETE": (state, action) => {
        const { id, type } = action.payload;
        const { displayedData } = _cloneDeep(state);
        displayedData[type] = _omit(displayedData[type], id);
        return {
            ...state,
            displayedData: displayedData
        };
    },
    "DASHBOARD_HOME_RESET": (state) => {
        const { originalData } = state;
        return {
            ...state,
            displayedData: _cloneDeep(originalData),
        };
    },
    "DASHBOARD_HOME_NEW": (state, action) => {
        const { id, payload, type } = action.payload;
        const { displayedData }= _cloneDeep(state);
        displayedData[type][id] = payload;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
    "DASHBOARD_HOME_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_HOME_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_HOME_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_HOME_WATCH": (state, action) => {
        const { displayedData }= _cloneDeep(state);
        const { uuid, field, value, type } = action.payload;
        displayedData[type][uuid][field] = value;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
}, initialState);

