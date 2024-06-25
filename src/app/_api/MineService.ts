import http from './http-common';

export const login = (payload: any) => {
  return http.post<any>('/login', payload);
};

export const listTask = (payload: any) => {
  return http.post<any>('/list-task', payload);
};

export const updateTask = (payload: any) => {
  return http.post<any>('/update-task', payload);
};

export const createTask = (payload: any) => {
  return http.post<any>('/create-task', payload);
};

export const createMine = (payload: any) => {
  return http.post<any>('/create-mine', payload);
};

export const listMine = (payload: any) => {
  return http.post<any>('/list-mine', payload);
};

export const removeMine = (payload: any) => {
  return http.post<any>('/remove-mine', payload);
};
