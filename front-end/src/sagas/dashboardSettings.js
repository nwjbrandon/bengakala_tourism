import { call, put, takeLatest } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_SETTINGS_ONMOUNT_REQUEST_NAME,
    DASHBOARD_SETTINGS_ONMOUNT_REQUEST,
    DASHBOARD_SETTINGS_ONMOUNT_SUCCESS,
    DASHBOARD_SETTINGS_ONMOUNT_ERROR,
    DASHBOARD_SETTINGS_CHANGE_ERROR,
    DASHBOARD_SETTINGS_CHANGE_REQUEST_NAME,
    DASHBOARD_SETTINGS_CHANGE_SUCCESS,
    DASHBOARD_SETTINGS_CREATE_ERROR,
    DASHBOARD_SETTINGS_CREATE_REQUEST_NAME,
    DASHBOARD_SETTINGS_CREATE_SUCCESS,
    DASHBOARD_SETTINGS_DELETE_ERROR,
    DASHBOARD_SETTINGS_DELETE_REQUEST_NAME,
    DASHBOARD_SETTINGS_DELETE_SUCCESS,
} from "../actions/dashboardSettings";
import { ADMIN_LOGOUT_REQUEST } from "../actions/admin";
import { TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW } from "../actions/toast";

function onMount() {
    return API.get('/admin/dashboard/settings');
}

function* workerSagaOnMount() {
    try {
        const { data } = yield call(onMount);
        yield put(DASHBOARD_SETTINGS_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_ONMOUNT_ERROR(error));
        const res = error.response;
        if (res) {
            if (res.status === 401) {
                yield put(ADMIN_LOGOUT_REQUEST());
            } else if (res.status === 422) {
                yield put(TOAST_ERROR_SHOW(res.data.error.message));
            } else {
                yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
            }
        }
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

function changePassword(payload) {
    return API.post('/admin/dashboard/settings', { ...payload});
}

function* workerSagaChangePassword(payload) {
    try {
        console.log(payload.payload);
        yield call(changePassword, payload.payload);
        yield put(DASHBOARD_SETTINGS_CHANGE_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('Password has changed'));
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_CHANGE_ERROR(error));
        const res = error.response;
        if (res) {
            if (res.status === 401) {
                yield put(ADMIN_LOGOUT_REQUEST());
            } else if (res.status === 422) {
                yield put(TOAST_ERROR_SHOW(res.data.error.message));
            } else {
                yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
            }
        }
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}

function createUser(payload) {
    return API.put('/admin/dashboard/settings', { ...payload});
}

function* workerSagaCreateUser(payload) {
    try {
        yield call(createUser, payload.payload);
        yield put(DASHBOARD_SETTINGS_CREATE_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('User is created'));
        yield put(DASHBOARD_SETTINGS_ONMOUNT_REQUEST())
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_CREATE_ERROR(error));
        const res = error.response;
        if (res) {
            if (res.status === 401) {
                yield put(ADMIN_LOGOUT_REQUEST());
            } else if (res.status === 422) {
                yield put(TOAST_ERROR_SHOW(res.data.error.message));
            } else {
                yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
            }
        }
        if (error.message === "Network Error") {
            yield put(TOAST_ERROR_SHOW('Server Error'));
        }
    }
}


function deleteUser(payload) {
    return API.del('/admin/dashboard/settings', { data: payload});
}

function* workerSagaDeleteUser(payload) {
    try {
        yield call(deleteUser, payload.payload);
        yield put(DASHBOARD_SETTINGS_DELETE_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('User is deleted'));
        yield put(DASHBOARD_SETTINGS_ONMOUNT_REQUEST())
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_DELETE_ERROR(error));
        if (error.status === 401) {
            yield put(ADMIN_LOGOUT_REQUEST());
        } else if (error.status === 422) {
            yield put(TOAST_ERROR_SHOW(error.data.error.message));
        } else {
            yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
        }
    }
}

export default [
    takeLatest(DASHBOARD_SETTINGS_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_SETTINGS_CHANGE_REQUEST_NAME, workerSagaChangePassword),
    takeLatest(DASHBOARD_SETTINGS_CREATE_REQUEST_NAME, workerSagaCreateUser),
    takeLatest(DASHBOARD_SETTINGS_DELETE_REQUEST_NAME, workerSagaDeleteUser),
]