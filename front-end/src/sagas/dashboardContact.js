import { call, put, takeLatest, select } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_CONTACT_ONMOUNT_REQUEST_NAME,
    DASHBOARD_CONTACT_ONMOUNT_REQUEST,
    DASHBOARD_CONTACT_ONMOUNT_SUCCESS,
    DASHBOARD_CONTACT_ONMOUNT_ERROR,
    DASHBOARD_CONTACT_SUBMIT_REQUEST_NAME,
    DASHBOARD_CONTACT_SUBMIT_SUCCESS,
    DASHBOARD_CONTACT_SUBMIT_ERROR,
    DASHBOARD_CONTACT_DELETE_REQUEST_NAME,
    DASHBOARD_CONTACT_DELETE_ERROR,
    DASHBOARD_CONTACT_DELETE_SUCCESS,
} from "../actions/dashboardContact";
import {ADMIN_LOGOUT_REQUEST} from "../actions/admin";
import {TOAST_ERROR_SHOW, TOAST_SUCCESS_SHOW} from "../actions/toast";

const displayedData = (state) => state.dashboardContact.displayedData.contact;

function onMount() {
    return API.get('/admin/dashboard/contact');
}

function* workerSagaOnMount() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_CONTACT_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_CONTACT_ONMOUNT_ERROR(error));
    }
}

function submit(payload) {
    return API.post('/admin/dashboard/contact', { data: payload});
}

function* workerSagaSubmit() {
    try {
        const payload = yield select(displayedData);
        yield call(submit, payload);
        yield put(DASHBOARD_CONTACT_SUBMIT_SUCCESS(payload));
        yield put(TOAST_SUCCESS_SHOW('Refresh the page to see the changes'));
        // yield put(DASHBOARD_CONTACT_ONMOUNT_REQUEST()) update causes server to crash
    } catch (error) {
        yield put(DASHBOARD_CONTACT_SUBMIT_ERROR(error));
        if (error.status === 401) {
            yield put(ADMIN_LOGOUT_REQUEST());
        } else if (error.status === 422) {
            yield put(TOAST_ERROR_SHOW(error.data.error.message));
        } else {
            yield put(TOAST_ERROR_SHOW('Oops something went wrong'));
        }
    }
}

function delCustomerQueries(payload) {
    return API.del('/admin/dashboard/contact', { data: payload});
}

function* workerSagaDeleteCustomerQueries(payload) {
    try {
        yield call(delCustomerQueries, payload.payload);
        yield put(DASHBOARD_CONTACT_DELETE_SUCCESS());
        yield put(TOAST_SUCCESS_SHOW('Successfully Deleted'));
        yield put(DASHBOARD_CONTACT_ONMOUNT_REQUEST());
    } catch (error) {
        yield put(DASHBOARD_CONTACT_DELETE_ERROR(error));
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
    takeLatest(DASHBOARD_CONTACT_ONMOUNT_REQUEST_NAME, workerSagaOnMount),
    takeLatest(DASHBOARD_CONTACT_SUBMIT_REQUEST_NAME, workerSagaSubmit),
    takeLatest(DASHBOARD_CONTACT_DELETE_REQUEST_NAME, workerSagaDeleteCustomerQueries),
]