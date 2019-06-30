import { createAction } from 'redux-actions'

export const TOAST_SUCCESS_SHOW_NAME = 'TOAST_SUCCESS_SHOW';
export const TOAST_SUCCESS_SHOW = createAction(TOAST_SUCCESS_SHOW_NAME);
export const TOAST_SUCCESS_CLEAR_NAME = 'TOAST_SUCCESS_CLEAR';
export const TOAST_SUCCESS_CLEAR = createAction(TOAST_SUCCESS_CLEAR_NAME);

export const TOAST_ERROR_SHOW_NAME = 'TOAST_ERROR_SHOW';
export const TOAST_ERROR_SHOW = createAction(TOAST_ERROR_SHOW_NAME);
export const TOAST_ERROR_CLEAR_NAME = 'TOAST_ERROR_CLEAR';
export const TOAST_ERROR_CLEAR = createAction(TOAST_ERROR_CLEAR_NAME);