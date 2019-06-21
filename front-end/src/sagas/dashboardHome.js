import { call, put, takeLatest, select } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_HOME_ONMOUNT_REQUEST_NAME,
    DASHBOARD_HOME_ONMOUNT_REQUEST,
    DASHBOARD_HOME_ONMOUNT_SUCCESS,
    DASHBOARD_HOME_ONMOUNT_ERROR,
    DASHBOARD_HOME_SUBMIT_REQUEST_NAME,
    DASHBOARD_HOME_SUBMIT_SUCCESS,
    DASHBOARD_HOME_SUBMIT_ERROR,
} from "../actions/dashboardHome";

const displayedData = (state) => state.dashboardHome.displayedData;

function onMount() {
    return API.get('/admin/dashboard/home');
}

function submit(payload) {
    return API.post('/admin/dashboard/home', { data: payload});
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_HOME_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_HOME_ONMOUNT_ERROR(error));
    }
}

function* workerSagaSubmit() {
    try {
        const payload = yield select(displayedData);
        yield call(submit, payload);
        yield put(DASHBOARD_HOME_SUBMIT_SUCCESS(payload));
        // yield put(DASHBOARD_FAQ_ONMOUNT_REQUEST()) update causes server to crash
    } catch (error) {
        yield put(DASHBOARD_HOME_SUBMIT_ERROR(error));
    }
}

export default [
    takeLatest(DASHBOARD_HOME_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_HOME_SUBMIT_REQUEST_NAME, workerSagaSubmit),
]