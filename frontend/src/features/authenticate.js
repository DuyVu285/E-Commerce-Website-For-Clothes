import axios from "axios";
import { setUserID } from "./authSlice";

const authenticate = async (dispatch, formData, endpoint) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/${endpoint}`,
      formData
    );
    console.log(response.data);
    dispatch(setUserID(response.data.UserID));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default authenticate;
