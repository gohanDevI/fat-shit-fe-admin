// import { Tokens } from '../constants';

const axiosInterceptor = {
  setupInterceptors: (axios: any, isToken = false, isFormData = false) => {
    axios.interceptors.request.use(
      (config: any) => {
        if (isToken) {
          return config;
        }

        let token = localStorage.getItem('authUser');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (isFormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
    axios.interceptors.response.use(
      (response: any) => successHandler(response),
      (error: any) => errorHandler(error),
    );
    const errorHandler = (error: any) => {
      return Promise.reject({ ...error });
    };
    const successHandler = (response: any) => {
      return response;
    };
  },
};

export default axiosInterceptor;
