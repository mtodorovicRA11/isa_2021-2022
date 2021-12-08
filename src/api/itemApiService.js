import axiosInstance from "./axiosInstance";

export const getItemService = async () => {
  try {
    const { data } = await axiosInstance.get('/item');
    return data;
  } catch (error) {
    throw error;
  }
}

