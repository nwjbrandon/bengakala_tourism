import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    CONTACT_FORM_REQUEST_NAME,
    CONTACT_FORM_SUCCESS,
    CONTACT_FORM_ERROR
} from "../actions/contact-form";

import {
    TOAST_SUCCESS_SHOW,
    TOAST_ERROR_SHOW,
} from "../actions/toast";

function submitForm({...data}) {
    return API.put('/contact/info', {...data});
}

function* workerSaga(payload) {
    try {
        const data = yield call(submitForm, payload.payload);
        yield put(CONTACT_FORM_SUCCESS(data));
        yield put(TOAST_SUCCESS_SHOW('Contact Form Submitted'));
    } catch (error) {
        yield put(CONTACT_FORM_ERROR(error));
        console.log(error.data.error.message);
        yield put(TOAST_ERROR_SHOW(error.data.error.message))
    }
}

export default [
    takeLatest(CONTACT_FORM_REQUEST_NAME, workerSaga),
]
