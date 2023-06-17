import axios from 'axios';
const axiosCall = axios.create({
  baseURL: process.env.REACT_APP_API_URL_UAT
});

export default axiosCall;
