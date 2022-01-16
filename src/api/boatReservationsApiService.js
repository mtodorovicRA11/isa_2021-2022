import axiosInstance from "./axiosInstance";

export const getBoatReservationsService = async (id) => {
  try {
    const { data } = await axiosInstance.get(`boat/${id}/date-range/all`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const postBoatReservationService = async (id, formData) => {
  try {
    const { data } = await axiosInstance.post(`boat/${id}/date-range/`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

