import { createAction, handleActions } from 'redux-actions';

export const DASHBOARD_ABOUT_INSERT = (payload) => {
    return {
        type: 'DASHBOARD_ABOUT_INSERT',
        payload
    }
};

export const DASHBOARD_ABOUT_RESET = () => {
    return {
        type: 'DASHBOARD_ABOUT_RESET',
    }
};

export const DASHBOARD_ABOUT_UPDATE = (payload) => {
    return {
        type: 'DASHBOARD_ABOUT_UPDATE',
        payload
    }
};
/*
export const DASHBOARD_ABOUT_ONMOUNT = () => {
    return {
        type: 'DASHBOARD_ABOUT_ONMOUNT',
    }
};
*/

export const DASHBOARD_ABOUT_ONMOUNT_NAME = 'DASHBOARD_ABOUT_ONMOUNT';
export const DASHBOARD_ABOUT_ONMOUNT = createAction(DASHBOARD_ABOUT_ONMOUNT_NAME);