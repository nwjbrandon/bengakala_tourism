import { call, put, takeLeading } from "redux-saga/effects";

import API from '../api';
import { DASHBOARD_ABOUT_ONMOUNT, DASHBOARD_ABOUT_ONMOUNT_NAME } from "../actions/dashboard-about";

function onMount() {
  return API.get('/about');
}

function* workerSaga() {
  try {
    const payload = {
      '1': {
        title: 'From saga Copy Getaway to a Kampong Living',
        type: '',
        text: 'From saga Gallop Kranji Farm Resort is a countryside destination located in Kranji, the north-west region of Singapore. Our Resort provides a local farm stay experience with our 35 villas choosing from our Standard, Superior, Executive, Premier Villa and Family Suite, with activities for all ages starting with our in-house Fruit & Vegetable Farm Tours, Herbal Plantation Tour, Bee Farm Tour, Animal Interaction with Pony Rides, Birdnest Museum Tour, Bottle Koi Feeding, Bird Farm Tour, Prawn Fishing, and our Family friendly Beer Garden and Variety of Food Options with Indoor and Outdoor Play area for the kids.',
        edit: false,
        mode: 'About',
      }
    };
    // testing API
    const data = yield call(onMount);
    yield put(DASHBOARD_ABOUT_ONMOUNT(payload));
  } catch (error) {
    console.log(error)
    yield put({ type: "DASHBOARD_ABOUT_ONMOUNT_FAILURE", error });
  }
}

export default [
  takeLeading(DASHBOARD_ABOUT_ONMOUNT_NAME, workerSaga),
]
