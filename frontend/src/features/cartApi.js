import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const addCartItem = async (userID, cartItems) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/users/${userID}/cart`,
      cartItems
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
