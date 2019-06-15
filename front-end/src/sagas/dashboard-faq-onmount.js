import { call, put, takeLatest } from "redux-saga/effects";
import API from '../api';
import {
    DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME,
    DASHBOARD_FAQ_ONMOUNT_SUCCESS,
    DASHBOARD_FAQ_ONMOUNT_ERROR
} from "../actions/dashboard-faq-onmount";

function onMount() {
    return API.get('/admin/dashboard/faq');
}

function* workerSaga() {
    try {
        const data = yield call(onMount);
        yield put(DASHBOARD_FAQ_ONMOUNT_SUCCESS(data));
    } catch (error) {
        yield put(DASHBOARD_FAQ_ONMOUNT_ERROR(error));
    }
}

export default [
    takeLatest(DASHBOARD_FAQ_ONMOUNT_REQUEST_NAME, workerSaga),
]