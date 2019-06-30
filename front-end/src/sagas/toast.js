import { put, takeLatest, delay, fork } from "redux-saga/effects";

import {
  TOAST_SUCCESS_SHOW_NAME,
  TOAST_SUCCESS_CLEAR
} from "../actions/toast";

function* workerSagaWatcher() {
    yield delay(5000);
    yield put(TOAST_SUCCESS_CLEAR());
}

function* workerSagaToast() {
    yield fork(workerSagaWatcher);
}

export default [
    takeLatest(TOAST_SUCCESS_SHOW_NAME, workerSagaToast),
]
