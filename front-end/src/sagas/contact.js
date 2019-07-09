import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    CONTACT_ONMOUNT_REQUEST_NAME,
    CONTACT_ONMOUNT_SUCCESS,
    CONTACT_ONMOUNT_ERROR,
    CONTACT_FORM_ERROR,
    CONTACT_FORM_REQUEST_NAME,
    CONTACT_FORM_SUCCESS
} from "../actions/contact";
import { TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/contact/info');
}

function* workerSagaOnMount() {
    try {
        const { data } = yield call(onMount);
        yield put(CONTACT_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(CONTACT_ONMOUNT_ERROR(error));
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

function submitForm({...data}) {
    return API.put('/contact/info', {...data});
}

function* workerSagaSubmit(payload) {
    try {
        const data = yield call(submitForm, payload.payload);
        yield put(CONTACT_FORM_SUCCESS(data));
        yield put(TOAST_SUCCESS_SHOW('Your response has been submitted'));
    } catch (error) {
        yield put(CONTACT_FORM_ERROR(error));
        const res = error.response;
        if (res) {
            if (res.status === 422) {
                yield put(TOAST_ERROR_SHOW(res.data.error.message));
            }
        }
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

export default [
    takeLatest(CONTACT_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(CONTACT_FORM_REQUEST_NAME, workerSagaSubmit),
]
