import { createAction } from 'redux-actions'

export const TOAST_SUCCESS_SHOW_NAME = 'TOAST_SUCCESS_SHOW';
export const TOAST_SUCCESS_SHOW = createAction(TOAST_SUCCESS_SHOW_NAME);
export const TOAST_SUCCESS_CLEAR_NAME = 'TOAST_SUCCESS_CLEAR';
export const TOAST_SUCCESS_CLEAR = createAction(TOAST_SUCCESS_CLEAR_NAME);