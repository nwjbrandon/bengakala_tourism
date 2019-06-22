import { call, put, takeLatest } from "redux-saga/effects";
import { push, } from "connected-react-router";

import API from '../api';
import {
    ADMIN_LOGIN_REQUEST_NAME,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_ERROR,
    ADMIN_LOGOUT_REQUEST_NAME,
    ADMIN_LOGOUT_SUCCESS,
    ADMIN_LOGOUT_ERROR
} from "../actions/admin";

function login(data) {
    return API.post('/admin/login', data);
}

function* workerSagaLogin(payload) {
    try {
        const data = yield call(login, payload.payload);
        yield put(ADMIN_LOGIN_SUCCESS(data));
        yield put(push('/dashboard'));
    } catch (error) {
        console.log(error);
        yield put(ADMIN_LOGIN_ERROR(error));
    }
}

function logout() {
    return API.get('/admin/logout');
}

function* workerSagaLogout() {
    try {
        yield call(logout);
        yield put(ADMIN_LOGOUT_SUCCESS());
        yield put(push('/admin'));
    } catch (error) {
        yield put(ADMIN_LOGOUT_ERROR(error));
    }
}

export default [
    takeLatest(ADMIN_LOGIN_REQUEST_NAME, workerSagaLogin),
    takeLatest(ADMIN_LOGOUT_REQUEST_NAME, workerSagaLogout),
]
