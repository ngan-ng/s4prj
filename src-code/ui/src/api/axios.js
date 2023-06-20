import axios from 'axios';

const axiosCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL_UAT,
});

axiosCall.interceptors.response.use(null, function (error) {
  console.log(
      error.config && error.response?.status === 401 && !error.config.__isRetry
  );
  if (
      error.config &&
      error.response?.status === 401 &&
      !error.config.__isRetry
  ) {
    return new Promise((resolve, reject) => {
      const callAccess = accessTokenHoc(error.config);
      callAccess(error.config)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
  return Promise.reject(error);
});

export default axiosCall;
