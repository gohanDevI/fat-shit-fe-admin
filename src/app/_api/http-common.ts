import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosInterceptor.setupInterceptors(http);
export default http;
