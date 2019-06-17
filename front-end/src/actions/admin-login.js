import { createAction } from 'redux-actions';

export const ADMIN_LOGIN_REQUEST_NAME = 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGIN_REQUEST = createAction(ADMIN_LOGIN_REQUEST_NAME);

export const ADMIN_LOGIN_SUCCESS_NAME = 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_SUCCESS = createAction(ADMIN_LOGIN_SUCCESS_NAME);

export const ADMIN_LOGIN_ERROR_NAME = 'ADMIN_LOGIN_ERROR';
export const ADMIN_LOGIN_ERROR = createAction(ADMIN_LOGIN_ERROR_NAME);