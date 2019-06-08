import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher sagas: watches for actions dispatched to the store, starts worker sagas
export default function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "http://localhost:3001/api/about"
  });
}

// worker sagas: makes the api call when watcher sagas sees the action
function* workerSaga() {
  try {
    console.log('hihi')
    const response = yield call(fetchDog);
    const dog = response.data;
    console.log(dog);
    console.log(555);
    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", dog });
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: "API_CALL_FAILURE", error });
  }
}
