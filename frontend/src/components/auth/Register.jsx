import React, { useState } from "react";
import authenticate from "../../features/authenticate";
import { StyledForm } from "./StyledForm";
import { toast } from "react-toastify";

const Register = () => {
  const initialState = {
    Username: "",
    Email: "",
    Password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [registrationStatus, setRegistrationStatus] = useState(null);

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
      const response = await authenticate(formData, "register");
      setFormData(initialState);

      if (response.message === "User registered successfully") {
        toast.success("User registered successfully", {
          position: "bottom-left",
        });
      } else if (response.message === "User already exists") {
        setRegistrationStatus("User already exists");
      }
    } catch (error) {
      console.error(error);
      setRegistrationStatus("Failed to register user/ User already exists!");
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
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
        <label>Email:</label>
        <input
          type="email"
          name="Email"
          value={formData.Email}
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
      <button type="submit">Register</button>
      {registrationStatus && (
        <p className="error-message">{registrationStatus}</p>
      )}
    </StyledForm>
  );
};

export default Register;
