import axios from "axios";

const authenticate = async (formData, endpoint) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/${endpoint}`,
      formData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authenticate;
