import { call, put, takeLatest } from "redux-saga/effects";

import API from '../api';
import {
    ADMIN_LOGIN_REQUEST_NAME,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_ERROR
} from "../actions/admin-login";

function login(data) {
    return API.post('/admin/login', data);
}

function* workerSaga(payload) {
    try {
        const data = yield call(login, payload.payload);
        yield put(ADMIN_LOGIN_SUCCESS(data));
    } catch (error) {
        console.log(error);
        yield put(ADMIN_LOGIN_ERROR(error));
    }
}

export default [
    takeLatest(ADMIN_LOGIN_REQUEST_NAME, workerSaga),
]
