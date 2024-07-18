import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const registerUser = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const res = await fetch("http://localhost:5000/users", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json; charset=UTF-8" },
        });

        if (res.status === 201) {
          setMessage("Registration successful!");
          setErrors({});
          navigate("/login");
        } else {
          setMessage("Registration failed.");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setMessage("Error registering user.");
      }
    }
  };

  return (
    <div className="text-center p-3 container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={(e) => { e.preventDefault(); registerUser(); }}>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.email ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.address ? 'is-invalid' : ''}`}
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleOnChange}
            required
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.phone ? 'is-invalid' : ''}`}
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleOnChange}
            required
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div className="form-group">
          <input
            className={`form-control mb-3 ${errors.confirmPassword ? 'is-invalid' : ''}`}
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleOnChange}
            required
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
