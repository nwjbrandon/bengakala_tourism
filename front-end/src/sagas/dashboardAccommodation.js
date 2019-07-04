import { call, put, takeLatest, select } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST_NAME,
    DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST,
    DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS,
    DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR,
    DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST_NAME,
    DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS,
    DASHBOARD_ACCOMMODATION_SUBMIT_ERROR,
} from "../actions/dashboardAccommodation";

const displayedData = (state) => state.dashboardAccommodation.displayedData;

function onMount() {
    return API.get('/admin/dashboard/booking');
}

function submit(payload) {
    return API.post('/admin/dashboard/booking', { data: payload});
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_ACCOMMODATION_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_ACCOMMODATION_ONMOUNT_ERROR(error));
    }
}

function* workerSagaSubmit() {
    try {
        const payload = yield select(displayedData);
        yield call(submit, payload);
        yield put(DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS(payload));
        // yield put(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST()) update causes server to crash
    } catch (error) {
        yield put(DASHBOARD_ACCOMMODATION_SUBMIT_ERROR(error));
    }
}

export default [
    takeLatest(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST_NAME, workerSagaSubmit),

]