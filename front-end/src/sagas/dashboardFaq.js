import { call, put, takeLatest, select } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME,
    DASHBOARD_FAQ_ONMOUNT_REQUEST,
    DASHBOARD_FAQ_ONMOUNT_SUCCESS,
    DASHBOARD_FAQ_ONMOUNT_ERROR,
    DASHBOARD_FAQ_SUBMIT_REQUEST_NAME,
    DASHBOARD_FAQ_SUBMIT_SUCCESS,
    DASHBOARD_FAQ_SUBMIT_ERROR,
} from "../actions/dashboardFaq";
import {TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW} from "../actions/toast";
import {ADMIN_LOGOUT_REQUEST} from "../actions/admin";

const displayedData = (state) => state.dashboardFaq.displayedData;

function onMount() {
    return API.get('/admin/dashboard/faq');
}

function submit(payload) {
    return API.post('/admin/dashboard/faq', { data: payload});
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_FAQ_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_FAQ_ONMOUNT_ERROR(error));
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
        yield put(DASHBOARD_FAQ_SUBMIT_SUCCESS(payload));
        yield put(TOAST_SUCCESS_SHOW('Refresh the page to see the changes'));
        // yield put(DASHBOARD_FAQ_ONMOUNT_REQUEST()) update causes server to crash
    } catch (error) {
        yield put(DASHBOARD_FAQ_SUBMIT_ERROR(error));
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
    takeLatest(DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_FAQ_SUBMIT_REQUEST_NAME, workerSagaSubmit),

]