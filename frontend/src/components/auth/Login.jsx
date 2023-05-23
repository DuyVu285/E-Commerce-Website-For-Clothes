import React, { useState } from "react";
import { StyledForm } from "./StyledForm";
import { toast } from "react-toastify";
import authenticate from "../../features/authenticate";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCartItem } from "../../features/cartApi";
import { updateCartWithUserID } from "../../features/cartSlice";
import { setLoggedIn, setUsername } from "../../features/authSlice";

const Login = () => {
  const initialState = {
    Username: "",
    Password: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userID = useSelector((state) => state.auth.UserID);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateCart = async (userID, cartItems) => {
    try {
      console.log(userID, cartItems);
      await addCartItem(dispatch, userID, cartItems);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update cart", { position: "bottom-left" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await authenticate(dispatch, formData, "login");
      setFormData(initialState);
      dispatch(setLoggedIn(true));
      dispatch(setUsername(formData.Username));
      toast.success("Login successful. Returning to Previous Page", {
        position: "bottom-left",
      });
      dispatch(updateCartWithUserID(userID));

      if (cartItems.length > 0) {
        await handleUpdateCart(userID, cartItems);
      }

      setTimeout(() => {
        history.goBack();
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Incorrect Username/Password!", {
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="Username"
            value={formData.Username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </StyledForm>
    </>
  );
};

export default Login;
