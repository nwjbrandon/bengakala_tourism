import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    CONTACT_ONMOUNT_REQUEST_NAME,
    CONTACT_ONMOUNT_SUCCESS,
    CONTACT_ONMOUNT_ERROR
} from "../actions/contact-onmount";

function onMount() {
    return API.get('/contact/info');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(CONTACT_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(CONTACT_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(CONTACT_ONMOUNT_REQUEST_NAME, workerSaga),
]
