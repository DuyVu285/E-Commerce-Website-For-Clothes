import axios from "axios";

const orderApi = async (formData, endpoint) => {
  try {
    const response = await axios.post(`http://localhost:5000/orders`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default orderApi;
