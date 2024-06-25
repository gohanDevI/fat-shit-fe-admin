import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function getUrl(config: any) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '').split('?')[0];
  }
  return config.url;
}

export const instance = axios.create({
  timeout: 60000,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.log(
      `%c ${error.response.status}  :`,
      'color: red; font-weight: bold',
      error.response.data,
    );
    return Promise.reject(error);
  },
);

const checkResponse = (error: any) => {
  switch (error.response.status) {
    case 403:
      alert('You have no permission');
      break;
    case 400:
      console.log(error.response.message);

      break;
    default:
      console.log(
        `%c ${error.response.status}  :`,
        'color: red; font-weight: bold',
        error.response.data,
      );
  }
};

instance.interceptors.response.use(
  (response) => {
    // checkResponse(response);
    console.log(
      ` %c ${response.status} - ${getUrl(response.config)}:`,
      'color: #008000; font-weight: bold',
      response,
    );
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(
        `%c ${error.response.status}  :`,
        'color: red; font-weight: bold',
        error.response.data,
      );
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message,
      });
    } else if (error.request) {
      console.log(
        `%c ${JSON.stringify(error)}  :`,
        'color: red; font-weight: bold',
        error.response.data,
      );
      return Promise.reject(error.request);
    } else {
      console.log(
        `%c ${JSON.stringify(error)}  :`,
        'color: red; font-weight: bold',
        'có gì đó sai sai, hình như là setting sai',
      );
      return Promise.reject(error);
    }
  },
);
