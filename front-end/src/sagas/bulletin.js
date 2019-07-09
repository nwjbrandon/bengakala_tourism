import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    BULLETIN_ONMOUNT_REQUEST_NAME,
    BULLETIN_ONMOUNT_SUCCESS,
    BULLETIN_ONMOUNT_ERROR
} from "../actions/bulletin";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/bulletin/info');
}

function* workerSaga() {
    try {
        const { data } = yield call(onMount);
        yield put(BULLETIN_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(BULLETIN_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(BULLETIN_ONMOUNT_REQUEST_NAME, workerSaga),
]
