import { createAction } from 'redux-actions';

export const DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST_NAME = 'DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST';
export const DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST = createAction(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST_NAME);
export const DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS_NAME = 'DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS';
export const DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS = createAction(DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS_NAME);
export const DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR_NAME = 'DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR';
export const DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR = createAction(DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR_NAME);

export const DASHBOARD_ACCOMMODATION_RESET_NAME = 'DASHBOARD_ACCOMMODATION_RESET';
export const DASHBOARD_ACCOMMODATION_RESET = createAction(DASHBOARD_ACCOMMODATION_RESET_NAME);

export const DASHBOARD_ACCOMMODATION_WATCH_NAME = 'DASHBOARD_ACCOMMODATION_WATCH';
export const DASHBOARD_ACCOMMODATION_WATCH = createAction(DASHBOARD_ACCOMMODATION_WATCH_NAME);

export const DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST_NAME = 'DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST';
export const DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST = createAction(DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST_NAME);
export const DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS_NAME = 'DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS';
export const DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS = createAction(DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS_NAME);
export const DASHBOARD_ACCOMMODATION_SUBMIT_ERROR_NAME = 'DASHBOARD_ACCOMMODATION_SUBMIT_ERROR';
export const DASHBOARD_ACCOMMODATION_SUBMIT_ERROR = createAction(DASHBOARD_ACCOMMODATION_SUBMIT_ERROR_NAME);