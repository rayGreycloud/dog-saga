import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

// watcher saga: watches for actions dispatched to store, starts worker saga
// function* = generator
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

// function makes api request and returns Promise
function fetchDog() {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breds/image/random'
  });
}

// worker saga: makes the api call when watcher sees action
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // dispatch success action to store with new dog
    yield put({ type: 'API_CALL_SUCCESS', dog });
  } catch (error) {
    // dispatch failure action with error
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}
