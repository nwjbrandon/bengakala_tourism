import { handleActions } from 'redux-actions';
import { insert, reset, update } from '../const/utils';

const initialState = {
    originalData: {},
    displayedData: {},
};

export const dashboardAboutReducer = handleActions({
    'DASHBOARD_ABOUT_RESET': (state) => {
        const { originalData } = initialState;
        return {
            ...state,
            ...initialState,
            displayedData: reset(originalData)
        };
    },
    'DASHBOARD_ABOUT_INSERT': (state, action) => {
        const { displayedData } = initialState;
        insert(displayedData, action.payload);
        return {
            ...state,
            ...initialState,
            displayedData
        };
    },
    'DASHBOARD_ABOUT_UPDATE': (state, action) => {
        const { displayedData } = initialState;
        update(displayedData, action.payload);
        return {
            ...state,
            ...initialState,
            displayedData
        };
    },
    'DASHBOARD_ABOUT_ONMOUNT': (state, action) => ({
        ...state,
        ...initialState,
        displayedData: { ...action.payload },
        originalData: { ...action.payload }
    })
}, initialState);

