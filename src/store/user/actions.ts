import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LIST_TASK_REQUEST,
  CREATE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  LIST_MINE_REQUEST,
  CREATE_MINE_REQUEST,
  UPDATE_MINE_REQUEST,
  REMOVE_MINE_REQUEST,
} from './actionTypes';

export const fetchUserRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: FETCH_USER_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const fetchUserSuccess = (payload: any): any => ({
  type: FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserFailure = (payload: any): any => ({
  type: FETCH_USER_FAILURE,
  payload,
});

export const listTaskRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: LIST_TASK_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const createTaskRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: CREATE_TASK_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const updateTaskRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: UPDATE_TASK_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const listMineRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: LIST_MINE_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const createMineRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: CREATE_MINE_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const updateMineRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: UPDATE_MINE_REQUEST,
  payload,
  onSuccess,
  onFailed,
});

export const removeMineRequest = (payload: any, onSuccess: any, onFailed: any): any => ({
  type: REMOVE_MINE_REQUEST,
  payload,
  onSuccess,
  onFailed,
});
