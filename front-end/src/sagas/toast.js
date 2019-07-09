import { put, takeLatest, delay, fork } from "redux-saga/effects";

import {
  TOAST_SUCCESS_SHOW_NAME,
  TOAST_ERROR_SHOW_NAME,
  TOAST_SUCCESS_CLEAR,
  TOAST_ERROR_CLEAR
} from "../actions/toast";

function* workerSagaSuccessWatcher() {
    yield delay(3000);
    yield put(TOAST_SUCCESS_CLEAR());
}

function* workerSagaSuccessToast() {
    yield fork(workerSagaSuccessWatcher);
}

function* workerSagaErrorWatcher() {
    yield delay(3000);
    yield put(TOAST_ERROR_CLEAR());
}

function* workerSagaErrorToast() {
    yield fork(workerSagaErrorWatcher);
}

export default [
    takeLatest(TOAST_SUCCESS_SHOW_NAME, workerSagaSuccessToast),
    takeLatest(TOAST_ERROR_SHOW_NAME, workerSagaErrorToast),
]
