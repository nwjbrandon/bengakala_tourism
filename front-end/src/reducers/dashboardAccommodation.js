import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';

const initialState = {
    originalData: {},
    displayedData: {},
    fetching: false,
    error: false,
};

export const dashboardAccommodationReducer = handleActions({
    "DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_ACCOMMODATION_RESET": (state) => {
        const { originalData } = state;
        return {
            ...state,
            displayedData: _cloneDeep(originalData),
        };
    },

    "DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_ACCOMMODATION_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_ACCOMMODATION_WATCH": (state, action) => {
        const { displayedData }= _cloneDeep(state);
        const { uuid, field, value } = action.payload;
        displayedData[uuid][field] = value;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
}, initialState);

