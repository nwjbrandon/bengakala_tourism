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
import {TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW} from "../actions/toast";

function login({...data}) {
    return API.post('/admin/login', {...data});
}

function* workerSagaLogin(payload) {
    try {
        const data = yield call(login, payload.payload);
        yield put(ADMIN_LOGIN_SUCCESS(data));
        yield put(TOAST_SUCCESS_SHOW('Successfully Login'));
        yield put(push('/dashboard'));
    } catch (error) {
        yield put(ADMIN_LOGIN_ERROR(error));
        if (error.status === 401) {
            yield put(TOAST_ERROR_SHOW('Invalid Username or Password'));
        } else if (error.status === 422) {
            yield put(TOAST_ERROR_SHOW(error.data.error.message));
        } else {
            yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
        }
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
