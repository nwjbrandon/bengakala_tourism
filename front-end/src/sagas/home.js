import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    HOME_ONMOUNT_REQUEST_NAME,
    HOME_ONMOUNT_SUCCESS,
    HOME_ONMOUNT_ERROR
} from "../actions/home";
import { TOAST_ERROR_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/home/info');
}

function* workerSaga() {
    try {
        const { data: { mission, stories } } = yield call(onMount);
        yield put(HOME_ONMOUNT_SUCCESS({ stories, mission }));
    } catch (error) {
        yield put(HOME_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(HOME_ONMOUNT_REQUEST_NAME, workerSaga),
]
