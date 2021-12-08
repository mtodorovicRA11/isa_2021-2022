import axiosInstance from "./axiosInstance";

export const getCottageService = async () => {
  try {
    const { data } = await axiosInstance.get('/cottage/all');
    return data;
  } catch (error) {
    throw error;
  }
}

export const postCottageService = async (formData) => {
  try {
    const { data } = await axiosInstance.post('/cottage/', formData);
    return data;
  } catch (error) {
    throw error;
  }
}

