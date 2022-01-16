import axiosInstance from "./axiosInstance";

export const getCottageReservationsService = async (id) => {
  try {
    const { data } = await axiosInstance.get(`cottage/${id}/date-range/all`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const postCottageReservationService = async (formData, id) => {
  try {
    const { data } = await axiosInstance.post(`cottage/${id}/date-range/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

