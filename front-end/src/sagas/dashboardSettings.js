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

function onMount() {
    return API.get('/admin/dashboard/settings');
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_SETTINGS_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_ONMOUNT_ERROR(error));
    }
}

function changePassword(payload) {
    return API.post('/admin/dashboard/settings', { data: payload});
}

function* workerSagaChangePassword(payload) {
    try {
        yield call(changePassword, payload.payload);
        yield put(DASHBOARD_SETTINGS_CHANGE_SUCCESS());
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_CHANGE_ERROR(error));
    }
}

function createUser(payload) {
    return API.put('/admin/dashboard/settings', { data: payload});
}

function* workerSagaCreateUser(payload) {
    try {
        yield call(createUser, payload.payload);
        yield put(DASHBOARD_SETTINGS_CREATE_SUCCESS());
        yield put(DASHBOARD_SETTINGS_ONMOUNT_REQUEST())
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_CREATE_ERROR(error));
    }
}


function deleteUser(payload) {
    return API.del('/admin/dashboard/settings', { data: payload});
}

function* workerSagaDeleteUser(payload) {
    try {
        yield call(deleteUser, payload.payload);
        yield put(DASHBOARD_SETTINGS_DELETE_SUCCESS());
        yield put(DASHBOARD_SETTINGS_ONMOUNT_REQUEST())
    } catch (error) {
        yield put(DASHBOARD_SETTINGS_DELETE_ERROR(error));
    }
}

export default [
    takeLatest(DASHBOARD_SETTINGS_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_SETTINGS_CHANGE_REQUEST_NAME, workerSagaChangePassword),
    takeLatest(DASHBOARD_SETTINGS_CREATE_REQUEST_NAME, workerSagaCreateUser),
    takeLatest(DASHBOARD_SETTINGS_DELETE_REQUEST_NAME, workerSagaDeleteUser),
]