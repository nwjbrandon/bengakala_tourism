import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    STORIES_ONMOUNT_REQUEST_NAME,
    STORIES_ONMOUNT_SUCCESS,
    STORIES_ONMOUNT_ERROR
} from "../actions/stories";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount(payload) {
    return API.get(`/stories/info/${payload}`);
}

function* workerSaga(payload) {
    try {
        const { data } = yield call(onMount, payload.payload);
        yield put(STORIES_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(STORIES_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(STORIES_ONMOUNT_REQUEST_NAME, workerSaga),
]
