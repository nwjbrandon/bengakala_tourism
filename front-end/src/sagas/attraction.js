import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    ATTRACTION_ONMOUNT_REQUEST_NAME,
    ATTRACTION_ONMOUNT_SUCCESS,
    ATTRACTION_ONMOUNT_ERROR
} from "../actions/attraction";

function onMount() {
    return API.get('/attraction/info');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(ATTRACTION_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(ATTRACTION_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(ATTRACTION_ONMOUNT_REQUEST_NAME, workerSaga),
]
