import { call, put, takeLatest } from "redux-saga/effects";
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import API from '../api';
import {
    DASHBOARD_ONMOUNT_REQUEST_NAME,
    DASHBOARD_ONMOUNT_REQUEST,
    DASHBOARD_ONMOUNT_SUCCESS,
    DASHBOARD_ONMOUNT_ERROR,
    DASHBOARD_CHECKIN_REQUEST_NAME,
    DASHBOARD_CHECKIN_SUCCESS,
    DASHBOARD_CHECKIN_ERROR,
    DASHBOARD_DELETE_CHECKIN_REQUEST_NAME,
    DASHBOARD_DELETE_CHECKIN_SUCCESS,
    DASHBOARD_DELETE_CHECKIN_ERROR,
} from "../actions/dashboard";
import {ADMIN_LOGOUT_REQUEST} from "../actions/admin";
import {TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW} from "../actions/toast";

function onMount() {
    return API.get('/admin/dashboard');
}

function* workerSagaOnMount() {
    try {
        const { data: { calendarHeatMap, transaction } } = yield call(onMount);
        const heatmap = _map(calendarHeatMap, (frequency, date) => [new Date(date), frequency]);
        const transactions = _map(transaction, (info, id) => _assign({
            uuid: id,
            ...info,
        }));
        yield put(DASHBOARD_ONMOUNT_SUCCESS({ heatmap, transactions }));
    } catch (error) {
        yield put(DASHBOARD_ONMOUNT_ERROR(error));
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

function checkIn(payload) {
    return API.post('/admin/dashboard', { data: payload });
}

function* workerSagaCheckIn(payload) {
    try {
        yield call(checkIn, payload.payload);
        yield put(DASHBOARD_CHECKIN_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('Refresh the page to see the changes'));
        yield put(DASHBOARD_ONMOUNT_REQUEST());
    } catch (error) {
        yield put(DASHBOARD_CHECKIN_ERROR(error));
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

function deleteCheckIn(payload) {
    return API.del('/admin/dashboard', { data: payload });
}

function* workerSagaDeleteCheckIn(payload) {
    try {
        yield call(deleteCheckIn, payload.payload);
        yield put(DASHBOARD_DELETE_CHECKIN_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('Refresh the page to see the changes'));
        yield put(DASHBOARD_ONMOUNT_REQUEST());
    } catch (error) {
        yield put(DASHBOARD_DELETE_CHECKIN_ERROR(error));
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


export default [
    takeLatest(DASHBOARD_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_CHECKIN_REQUEST_NAME, workerSagaCheckIn),
    takeLatest(DASHBOARD_DELETE_CHECKIN_REQUEST_NAME, workerSagaDeleteCheckIn),

]