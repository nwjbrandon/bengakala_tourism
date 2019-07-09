import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    RESOURCES_ONMOUNT_REQUEST_NAME,
    RESOURCES_ONMOUNT_SUCCESS,
    RESOURCES_ONMOUNT_ERROR
} from "../actions/resources";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/resources/info');
}

function* workerSaga() {
    try {
        const { data } = yield call(onMount);
        yield put(RESOURCES_ONMOUNT_SUCCESS(data));
    } catch (error) {
        console.log(error.message);
        yield put(RESOURCES_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(RESOURCES_ONMOUNT_REQUEST_NAME, workerSaga),
]
