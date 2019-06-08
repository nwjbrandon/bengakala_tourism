import {call, put, takeLeading} from "redux-saga/effects";

import API from '../api';
import {DASHBOARD_ABOUT_INSERT, DASHBOARD_ABOUT_ONMOUNT} from "../actions/dashboard-about";

function onMount() {
  return API.get('/about');
}

// worker sagas: makes the api call when watcher sagas sees the action
function* workerSaga() {
  try {
    const payload = {
      '1': {
        title: 'From saga Copy Getaway to a Kampong Living',
        type: '',
        text: 'From saga Gallop Kranji Farm Resort is a countryside destination located in Kranji, the north-west region of Singapore. Our Resort provides a local farm stay experience with our 35 villas choosing from our Standard, Superior, Executive, Premier Villa and Family Suite, with activities for all ages starting with our in-house Fruit & Vegetable Farm Tours, Herbal Plantation Tour, Bee Farm Tour, Animal Interaction with Pony Rides, Birdnest Museum Tour, Bottle Koi Feeding, Bird Farm Tour, Prawn Fishing, and our Family friendly Beer Garden and Variety of Food Options with Indoor and Outdoor Play area for the kids.',
        edit: false,
        mode: 'about',
      }
    };
    const data = yield call(onMount);
    console.log(data);
    yield put(DASHBOARD_ABOUT_ONMOUNT(payload));
  
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log(error)
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

export default [
  takeLeading("DASHBOARD_ABOUT_ONMOUNT", workerSaga),
]
