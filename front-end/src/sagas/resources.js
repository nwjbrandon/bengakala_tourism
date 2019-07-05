import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    RESOURCES_ONMOUNT_REQUEST_NAME,
    RESOURCES_ONMOUNT_SUCCESS,
    RESOURCES_ONMOUNT_ERROR
} from "../actions/resources";

function onMount() {
    return API.get('/resources/info');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(RESOURCES_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(RESOURCES_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(RESOURCES_ONMOUNT_REQUEST_NAME, workerSaga),
]
