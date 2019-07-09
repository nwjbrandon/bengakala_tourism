import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    FAQ_ONMOUNT_REQUEST_NAME,
    FAQ_ONMOUNT_SUCCESS,
    FAQ_ONMOUNT_ERROR
} from "../actions/faq";
import {TOAST_ERROR_SHOW} from "../actions/toast";

function onMount() {
    return API.get('/faq/info');
}

function* workerSaga() {
    try {
        const { data } = yield call(onMount);
        yield put(FAQ_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(FAQ_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(FAQ_ONMOUNT_REQUEST_NAME, workerSaga),
]
