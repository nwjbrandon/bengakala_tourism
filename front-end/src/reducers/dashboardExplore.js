import { handleActions } from 'redux-actions';
import _omit from 'lodash/omit';
import _cloneDeep from 'lodash/cloneDeep';
import _assign from 'lodash/assign';

const initialState = {
    originalData: {},
    displayedData: {},
    fetching: false,
    error: false,
};

export const dashboardExploreReducer = handleActions({
    "DASHBOARD_EXPLORE_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_EXPLORE_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload,
            originalData: action.payload,
            error: false,
        };
    },
    "DASHBOARD_EXPLORE_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_EXPLORE_DELETE": (state, action) => {
        const { displayedData } = state;
        const newDisplayedData = _omit(displayedData, action.payload);
        return {
            ...state,
            displayedData: newDisplayedData,
        };
    },
    "DASHBOARD_EXPLORE_RESET": (state) => {
        const { originalData } = state;
        return {
            ...state,
            displayedData: _cloneDeep(originalData),
        };
    },
    "DASHBOARD_EXPLORE_NEW": (state, action) => {
        const { id, payload } = action.payload;
        const { displayedData }= _cloneDeep(state);
        const newDisplayedData = _assign({
            [id]: payload,
            ...displayedData,
        });
        displayedData[id] = payload;
        return {
            ...state,
            displayedData: newDisplayedData,
        }
    },
    "DASHBOARD_EXPLORE_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_EXPLORE_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_EXPLORE_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_EXPLORE_WATCH": (state, action) => {
        const { displayedData }= _cloneDeep(state);
        const { uuid, field, value } = action.payload;
        displayedData[uuid][field] = value;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
}, initialState);

