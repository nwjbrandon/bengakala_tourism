import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    STORY_ONMOUNT_REQUEST_NAME,
    STORY_ONMOUNT_SUCCESS,
    STORY_ONMOUNT_ERROR
} from "../actions/story";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount(payload) {
    return API.get(`/story/${payload}`);
}

function* workerSaga(payload) {
    try {
        const { data } = yield call(onMount, payload.payload);
        yield put(STORY_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(STORY_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(STORY_ONMOUNT_REQUEST_NAME, workerSaga),
]
