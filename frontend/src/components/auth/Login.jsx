import React, { useState } from "react";
import { StyledForm } from "./StyledForm";
import { toast } from "react-toastify";
import authenticate from "../../features/authenticate";

const Login = () => {
  const initialState = {
    Username: "",
    Password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await authenticate(formData,"login");
      setFormData(initialState);
      toast.success("Login successful", {
        position: "bottom-left",
      });
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