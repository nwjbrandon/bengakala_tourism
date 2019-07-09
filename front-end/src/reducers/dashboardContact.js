import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';

const initialState = {
    originalData: {
        contact: {},
        customer: {},
    },
    displayedData: {
        contact: {},
        customer: {},
    },
    fetching: false,
    error: false,
};

export const dashboardContactReducer = handleActions({
    "DASHBOARD_CONTACT_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_CONTACT_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_CONTACT_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_CONTACT_RESET": (state) => {
        const { originalData } = state;
        return {
            ...state,
            displayedData: _cloneDeep(originalData),
        };
    },
    "DASHBOARD_CONTACT_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_CONTACT_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_CONTACT_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_CONTACT_WATCH": (state, action) => {
        const { displayedData }= _cloneDeep(state);
        const { uuid, field, value, type } = action.payload;
        displayedData[type][uuid][field] = value;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
}, initialState);

