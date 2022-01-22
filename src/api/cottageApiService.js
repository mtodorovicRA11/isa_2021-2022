import axiosInstance from "./axiosInstance";

export const getCottagesService = async () => {
  try {
    const { data } = await axiosInstance.get('/cottage/all');
    return data;
  } catch (error) {
    throw error;
  }
}

export const getFilteredCottagesService = async (params) => {
  try {
    const { data } = await axiosInstance.get('/cottage/filter', { params: {
        cottage_name: params.searchParam
      }});
    return data;
  } catch (error) {
    throw error;
  }
}

export const getCottageService = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/cottage/${id}`);
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

export const updateCottageService = async (formData) => {
  try {
    const { data } = await axiosInstance.put(`/cottage/${formData.id}`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteCottageService = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/cottage/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export const postCottageReservationReviewService = async (id, formData) => {
  try {
    const { data } = await axiosInstance.post(`/cottage/date-range/${id}/occupant-review`, formData);
    return data;
  } catch (error) {
    throw error;
  }
}

