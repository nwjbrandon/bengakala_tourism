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
} from "../actions/dashboard";

function onMount() {
    return API.get('/admin/dashboard');
}

function* workerSagaOnMount() {
    try {
        const { calendarHeatMap, transaction } = yield call(onMount);
        const heatmap = _map(calendarHeatMap, (frequency, date) => [new Date(date), frequency]);
        const transactions = _map(transaction, (info, id) => _assign({
            uuid: id,
            ...info,
        }));
        yield put(DASHBOARD_ONMOUNT_SUCCESS({ heatmap, transactions }));
    } catch (error) {
        yield put(DASHBOARD_ONMOUNT_ERROR(error));
    }
}

function checkIn(payload) {
    return API.post('/admin/dashboard', { data: payload });
}

function* workerSagaCheckIn(payload) {
    try {
        yield call(checkIn, payload.payload);
        yield put(DASHBOARD_CHECKIN_SUCCESS());
        yield put(DASHBOARD_ONMOUNT_REQUEST());
    } catch (error) {
        yield put(DASHBOARD_CHECKIN_ERROR(error));
    }
}


export default [
    takeLatest(DASHBOARD_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_CHECKIN_REQUEST_NAME, workerSagaCheckIn),
]