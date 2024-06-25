import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchUserSuccess, fetchUserFailure } from './actions';
import {
  FETCH_USER_REQUEST,
  LIST_TASK_REQUEST,
  CREATE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  LIST_MINE_REQUEST,
  CREATE_MINE_REQUEST,
  REMOVE_MINE_REQUEST,
} from './actionTypes';
import {
  createMine,
  createTask,
  listMine,
  listTask,
  login,
  removeMine,
  updateTask,
} from '@/app/_api/MineService';

function* fetchUserSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(login, payload);
    if (response) {
      yield put(fetchUserSuccess(response));
      onSuccess?.(payload);
    }
  } catch (e: any) {
    onFailed?.(e);
    yield put(
      fetchUserFailure({
        error: e.message,
      }),
    );
  }
}

function* getListTaskSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(listTask, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* createTaskSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(createTask, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* updateTaskSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(updateTask, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}
function* getlistMineSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(listMine, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* createMineSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(createMine, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* updateMineSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(updateTask, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* removeMineSaga(action: any): any {
  const { payload, onSuccess, onFailed } = action;
  try {
    const response = yield call(removeMine, payload);
    onSuccess?.(response.data);
  } catch (e: any) {
    onFailed?.(e);
  }
}

function* userSaga() {
  yield all([takeLatest(FETCH_USER_REQUEST, fetchUserSaga)]);
  yield all([takeLatest(LIST_TASK_REQUEST, getListTaskSaga)]);
  yield all([takeLatest(CREATE_TASK_REQUEST, createTaskSaga)]);
  yield all([takeLatest(UPDATE_TASK_REQUEST, updateTaskSaga)]);
  yield all([takeLatest(LIST_MINE_REQUEST, getlistMineSaga)]);
  yield all([takeLatest(CREATE_MINE_REQUEST, createMineSaga)]);
  yield all([takeLatest(REMOVE_MINE_REQUEST, removeMineSaga)]);
}

export default userSaga;
