import history from "../history";
import axiosInstance, { deleteToken, setToken } from "./axiosInstance";

export const loginService = async (formData) => {
  try {
    const { data } = await axiosInstance.post('/login', formData);
    setToken(data.token);
    history.push('/', { replace: true });
  } catch (error) {
    throw error;
  }
}

export const logoutService = () => {
  deleteToken();
  history.push('/login', { replace: true })
}

export const registerService = async (formData) => {
  try {
    await axiosInstance.post('/register', formData);
    history.push('/login', { repalace: true });
  } catch (error) {
    throw error;
  }
}
