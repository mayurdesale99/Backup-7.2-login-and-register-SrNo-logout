// src/Components/AddUser.js
import React, { useState } from "react";
import './AddUser.css';

const AddUser = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid. It should be 10 digits.";
    }

    return newErrors;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      addUser(formData.name, formData.email, formData.address, formData.phone);
      setFormData({ name: '', email: '', address: '', phone: '' });
      setErrors({});
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Add User</h4>
      <form onSubmit={handleOnSubmit}>
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
            placeholder="Phone (10 digits)"
            name="phone"
            value={formData.phone}
            onChange={handleOnChange}
            required
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
        <hr />
      </form>
    </div>
  );
};

export default AddUser;
