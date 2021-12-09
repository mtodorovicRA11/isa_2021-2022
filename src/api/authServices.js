import axiosInstance, {deleteToken, setRole, setToken} from "./axiosInstance";

export const loginService = async (formData) => {
  try {
    const { data } = await axiosInstance.post('/authentication/sign-in', formData);
    setToken(data.jwt);
    setRole(data.role);
  } catch (error) {
    throw error;
  }
}

export const logoutService = () => {
  deleteToken();
}

export const registerService = async (formData) => {
  try {
    await axiosInstance.post('/authentication/sign-up', formData);
  } catch (error) {
    throw error;
  }
}
