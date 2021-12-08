import axiosInstance from "./axiosInstance";

export const getMeService = async () => {
  try {
    const { data } = await axiosInstance.get('/user/me');
    return data;
  } catch (error) {
    throw error;
  }
}

export const updateMeService = async (formData) => {
  try {
    await axiosInstance.put('/user/me', formData);
  } catch (error) {
    throw error;
  }
}
