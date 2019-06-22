import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    FAQ_ONMOUNT_REQUEST_NAME,
    FAQ_ONMOUNT_SUCCESS,
    FAQ_ONMOUNT_ERROR
} from "../actions/faq";

function onMount() {
    return API.get('/faq/info');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(FAQ_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(FAQ_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(FAQ_ONMOUNT_REQUEST_NAME, workerSaga),
]
