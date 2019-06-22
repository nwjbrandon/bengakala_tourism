import { createAction } from 'redux-actions';

export const FAQ_ONMOUNT_REQUEST_NAME = 'FAQ_ONMOUNT_REQUEST';
export const FAQ_ONMOUNT_REQUEST = createAction(FAQ_ONMOUNT_REQUEST_NAME);
export const FAQ_ONMOUNT_SUCCESS_NAME = 'FAQ_ONMOUNT_SUCCESS';
export const FAQ_ONMOUNT_SUCCESS = createAction(FAQ_ONMOUNT_SUCCESS_NAME);
export const FAQ_ONMOUNT_ERROR_NAME = 'FAQ_ONMOUNT_ERROR';
export const FAQ_ONMOUNT_ERROR = createAction(FAQ_ONMOUNT_ERROR_NAME);
