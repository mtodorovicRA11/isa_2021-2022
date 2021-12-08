import axios from "axios";


export const getToken = () => {
  return localStorage.getItem('userToken');
}

export const setToken = (token) => {
  localStorage.setItem('userToken', token);
}

export const deleteToken = () => {
  localStorage.removeItem('userToken');
}

export const BASE_URL = "https://some-domain.com/api/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // headers: {}
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = token;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default axiosInstance;