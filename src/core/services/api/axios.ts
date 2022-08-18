import axios, { AxiosRequestConfig } from 'axios';

import { BASE_API_URL } from '@/core/config/constants';

const api = axios.create({
  baseURL: BASE_API_URL,
});

const requestHandler = (request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

api.interceptors.request.use(requestHandler);

export default api;
