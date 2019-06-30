import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    CONTACT_FORM_REQUEST_NAME,
    CONTACT_FORM_SUCCESS,
    CONTACT_FORM_ERROR
} from "../actions/contact-form";

function submitForm({...data}) {
    return API.put('/contact/info', {...data});
}

function* workerSaga(payload) {
    try {
        console.log(payload.payload);
        const data = yield call(submitForm, payload.payload);
        yield put(CONTACT_FORM_SUCCESS(data));
    } catch (error) {
        console.log('inside saga ', error);
        yield put(CONTACT_FORM_ERROR(error));
    }
}

export default [
    takeLatest(CONTACT_FORM_REQUEST_NAME, workerSaga),
]
