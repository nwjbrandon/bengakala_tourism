import { handleActions } from 'redux-actions';
import _cloneDeep from 'lodash/cloneDeep';
import isSameDay from 'date-fns/is_same_day';

const initialState = {
    originalData: {},
    displayedData: {},
    excludedDates: [],
    fetching: false,
    error: false,
};

export const dashboardBookingReducer = handleActions({
    "DASHBOARD_BOOKING_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "DASHBOARD_BOOKING_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            displayedData: action.payload.costs,
            originalData: action.payload.costs,
            excludedDates: action.payload.excludedDates,
            error: false,
        };
    },
    "DASHBOARD_BOOKING_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
    "DASHBOARD_BOOKING_RESET": (state) => {
        const { originalData } = state;
        return {
            ...state,
            displayedData: _cloneDeep(originalData),
        };
    },

    "DASHBOARD_BOOKING_SUBMIT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_BOOKING_SUBMIT_SUCCESS": (state, action) => {
        return {
            ...state,
            originalData: _cloneDeep(action.payload.displayedData),
            excludedDates: _cloneDeep(action.payload.excludedDates),
            fetching: true,
            error: false,
        }
    },
    "DASHBOARD_BOOKING_SUBMIT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: true,
            error: action.payload,
        }
    },
    "DASHBOARD_BOOKING_WATCH": (state, action) => {
        const { displayedData }= _cloneDeep(state);
        const { uuid, field, value } = action.payload;
        displayedData[uuid][field] = value;
        return {
            ...state,
            displayedData: displayedData,
        }
    },
    "DASHBOARD_BOOKING_DATE_WATCH": (state, action) => {
        const date = action.payload;
        const { excludedDates }= _cloneDeep(state);
        let data = [];
        if (excludedDates.find(item => { return isSameDay(new Date(item[0]), new Date(date)) })) {
            data = excludedDates.filter(item => !isSameDay(new Date(item[0]), new Date(date)));
        } else {
            excludedDates.push([new Date(date), -1]);
            data = excludedDates;
        }
        return {
            ...state,
            excludedDates: data,
        }
    },
}, initialState);

