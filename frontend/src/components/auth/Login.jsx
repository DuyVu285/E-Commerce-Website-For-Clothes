import React, { useState } from "react";
import { StyledForm } from "./StyledForm";
import { toast } from "react-toastify";
import authenticate from "../../features/authenticate";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { addCartItem } from "../../features/cartApi";

const Login = ({ setIsLoggedIn, setUsername }) => {
  const initialState = {
    Username: "",
    Password: "",
  };

  const history = useHistory();
  const [formData, setFormData] = useState(initialState);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateCart = async (userID, cartItems) => {
    try {
      console.log(userID, cartItems);
      await addCartItem(userID, cartItems);
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
      const { UserID } = await authenticate(formData, "login");
      setFormData(initialState);
      setIsLoggedIn(true);
      setUsername(formData.Username);
      toast.success("Login successful. Returning to Previous Page", {
        position: "bottom-left",
      });

      if (cartItems.length > 0) {
        await handleUpdateCart(UserID, cartItems);
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
