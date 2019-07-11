import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    EXPLORE_ONMOUNT_REQUEST_NAME,
    EXPLORE_ONMOUNT_SUCCESS,
    EXPLORE_ONMOUNT_ERROR
} from "../actions/explore";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/explore/info');
}

function* workerSaga() {
    try {
        const { data } = yield call(onMount);
        yield put(EXPLORE_ONMOUNT_SUCCESS(data));
    } catch (error) {
        console.log(error.message);
        yield put(EXPLORE_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(EXPLORE_ONMOUNT_REQUEST_NAME, workerSaga),
]
