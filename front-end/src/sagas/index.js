import { all } from 'redux-saga/effects';

import dashboardAbout from './dashboard-about';

export default function* rootSaga() {
  yield all([
    ...dashboardAbout,
  ]);
}