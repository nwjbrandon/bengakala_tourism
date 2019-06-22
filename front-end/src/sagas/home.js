import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    HOME_ONMOUNT_REQUEST_NAME,
    HOME_ONMOUNT_SUCCESS,
    HOME_ONMOUNT_ERROR
} from "../actions/home";

function onMount() {
    return API.get('/home/info');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(HOME_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(HOME_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(HOME_ONMOUNT_REQUEST_NAME, workerSaga),
]
