import axiosInstance from "./axiosInstance";

export const getBoatsService = async () => {
  try {
    const { data } = await axiosInstance.get('/boat/all');
    return data;
  } catch (error) {
    throw error;
  }
}

export const getFilteredBoatsService = async (params) => {
  try {
    const { data } = await axiosInstance.get('/boat/filter', { params: {
        boat_name: params.searchParam
      }});
    return data;
  } catch (error) {
    throw error;
  }
}

export const getBoatService = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/boat/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const postBoatService = async (formData) => {
  try {
    const { data } = await axiosInstance.post('/boat/', formData);
    return data;
  } catch (error) {
    throw error;
  }
}

export const updateBoatService = async (formData) => {
  try {
    const { data } = await axiosInstance.put(`/boat/${formData.id}`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteBoatService = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/boat/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const postBoatReservationReviewService = async (id, formData) => {
  try {
    const { data } = await axiosInstance.post(`/boat/date-range/${id}/renter-review`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}


