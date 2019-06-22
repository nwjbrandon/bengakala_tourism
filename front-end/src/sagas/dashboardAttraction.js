import { call, put, takeLatest, select } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_ATTRACTION_ONMOUNT_REQUEST_NAME,
    DASHBOARD_ATTRACTION_ONMOUNT_REQUEST,
    DASHBOARD_ATTRACTION_ONMOUNT_SUCCESS,
    DASHBOARD_ATTRACTION_ONMOUNT_ERROR,
    DASHBOARD_ATTRACTION_SUBMIT_REQUEST_NAME,
    DASHBOARD_ATTRACTION_SUBMIT_SUCCESS,
    DASHBOARD_ATTRACTION_SUBMIT_ERROR,
} from "../actions/dashboardAttraction";

const displayedData = (state) => state.dashboardAttraction.displayedData;

function onMount() {
    return API.get('/admin/dashboard/attraction');
}

function submit(payload) {
    return API.post('/admin/dashboard/attraction', { data: payload});
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_ATTRACTION_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_ATTRACTION_ONMOUNT_ERROR(error));
    }
}

function* workerSagaSubmit() {
    try {
        const payload = yield select(displayedData);
        yield call(submit, payload);
        yield put(DASHBOARD_ATTRACTION_SUBMIT_SUCCESS(payload));
        // yield put(DASHBOARD_FAQ_ONMOUNT_REQUEST()) update causes server to crash
    } catch (error) {
        yield put(DASHBOARD_ATTRACTION_SUBMIT_ERROR(error));
    }
}

export default [
    takeLatest(DASHBOARD_ATTRACTION_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_ATTRACTION_SUBMIT_REQUEST_NAME, workerSagaSubmit),

]