import { call, put, takeLatest, select, delay } from "redux-saga/effects";
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
import {TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW} from "../actions/toast";
import {ADMIN_LOGOUT_REQUEST} from "../actions/admin";

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
        if (error.status === 401) {
            yield put(ADMIN_LOGOUT_REQUEST());
        } else {
            yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
        }
    }
}

function* workerSagaSubmit() {
    try {
        const payload = yield select(displayedData);
        yield call(submit, payload);
        yield put(DASHBOARD_ACCOMMODATION_SUBMIT_SUCCESS(payload));
        yield put(TOAST_SUCCESS_SHOW('Refresh the page to see the changes'));
        // yield put(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST())
    } catch (error) {
        yield put(DASHBOARD_ACCOMMODATION_SUBMIT_ERROR(error));
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
    takeLatest(DASHBOARD_ACCOMMODATION_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_ACCOMMODATION_SUBMIT_REQUEST_NAME, workerSagaSubmit),

]