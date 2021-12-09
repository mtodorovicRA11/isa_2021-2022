import axios from "axios";


export const getToken = () => {
  return localStorage.getItem('userToken');
}

export const setToken = (token) => {
  localStorage.setItem('userToken', token);
}

export const getRole = () => {
  return localStorage.getItem('userRole');
}

export const setRole = (role) => {
  localStorage.setItem('userRole', role);
}

export const deleteToken = () => {
  localStorage.removeItem('userToken');
}

export const BASE_URL = "http://localhost:8080/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "*",
    "Access-Control-Allow-Origin": "*"
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default axiosInstance;