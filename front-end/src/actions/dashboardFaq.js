import { createAction } from 'redux-actions';

export const DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME = 'DASHBOARD_FAQ_ONMOUNT_REQUEST';
export const DASHBOARD_FAQ_ONMOUNT_REQUEST = createAction(DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME);
export const DASHBOARD_FAQ_ONMOUNT_SUCCESS_NAME = 'DASHBOARD_FAQ_ONMOUNT_SUCCESS';
export const DASHBOARD_FAQ_ONMOUNT_SUCCESS = createAction(DASHBOARD_FAQ_ONMOUNT_SUCCESS_NAME);
export const DASHBOARD_FAQ_ONMOUNT_ERROR_NAME = 'DASHBOARD_FAQ_ONMOUNT_ERROR';
export const DASHBOARD_FAQ_ONMOUNT_ERROR = createAction(DASHBOARD_FAQ_ONMOUNT_ERROR_NAME);

export const DASHBOARD_FAQ_DELETE_NAME = 'DASHBOARD_FAQ_DELETE';
export const DASHBOARD_FAQ_DELETE = createAction(DASHBOARD_FAQ_DELETE_NAME);
export const DASHBOARD_FAQ_NEW_NAME = 'DASHBOARD_FAQ_NEW';
export const DASHBOARD_FAQ_NEW = createAction(DASHBOARD_FAQ_NEW_NAME);
export const DASHBOARD_FAQ_RESET_NAME = 'DASHBOARD_FAQ_RESET';
export const DASHBOARD_FAQ_RESET = createAction(DASHBOARD_FAQ_RESET_NAME);

export const DASHBOARD_FAQ_WATCH_NAME = 'DASHBOARD_FAQ_WATCH';
export const DASHBOARD_FAQ_WATCH = createAction(DASHBOARD_FAQ_WATCH_NAME);
export const DASHBOARD_FAQ_EDIT_NAME = 'DASHBOARD_EDIT_WATCH';
export const DASHBOARD_FAQ_EDIT = createAction(DASHBOARD_FAQ_EDIT_NAME);

export const DASHBOARD_FAQ_SUBMIT_REQUEST_NAME = 'DASHBOARD_FAQ_SUBMIT_REQUEST';
export const DASHBOARD_FAQ_SUBMIT_REQUEST = createAction(DASHBOARD_FAQ_SUBMIT_REQUEST_NAME);
export const DASHBOARD_FAQ_SUBMIT_SUCCESS_NAME = 'DASHBOARD_FAQ_SUBMIT_SUCCESS';
export const DASHBOARD_FAQ_SUBMIT_SUCCESS = createAction(DASHBOARD_FAQ_SUBMIT_SUCCESS_NAME);
export const DASHBOARD_FAQ_SUBMIT_ERROR_NAME = 'DASHBOARD_FAQ_SUBMIT_ERROR';
export const DASHBOARD_FAQ_SUBMIT_ERROR = createAction(DASHBOARD_FAQ_SUBMIT_ERROR_NAME);
