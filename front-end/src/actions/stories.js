import { createAction } from 'redux-actions';

export const STORIES_ONMOUNT_REQUEST_NAME = 'STORIES_ONMOUNT_REQUEST';
export const STORIES_ONMOUNT_REQUEST = createAction(STORIES_ONMOUNT_REQUEST_NAME);

export const STORIES_ONMOUNT_SUCCESS_NAME = 'STORIES_ONMOUNT_SUCCESS';
export const STORIES_ONMOUNT_SUCCESS = createAction(STORIES_ONMOUNT_SUCCESS_NAME);

export const STORIES_ONMOUNT_ERROR_NAME = 'STORIES_ONMOUNT_ERROR';
export const STORIES_ONMOUNT_ERROR = createAction(STORIES_ONMOUNT_ERROR_NAME);