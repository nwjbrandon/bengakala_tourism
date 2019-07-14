import { handleActions } from 'redux-actions';

const initialState = {
    data: {
        groupedFaqs: {},
        ungroupedFaqs: [],
    },
    fetching: false,
    error: false,
};

export const faqOnMountReducer = handleActions({
    "FAQ_ONMOUNT_REQUEST": (state) => {
        return {
            ...state,
            fetching: true,
            error: false,
        };
    },
    "FAQ_ONMOUNT_SUCCESS": (state, action) => {
        return {
            ...state,
            fetching: false,
            data: action.payload,
            error: false,
        };
    },
    "FAQ_ONMOUNT_ERROR": (state, action) => {
        return {
            ...state,
            fetching: false,
            error: action.payload,
        };
    },
}, initialState);

