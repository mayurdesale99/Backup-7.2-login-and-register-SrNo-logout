// src/Components/User.js
import React, { useState } from "react";
import "./User.css";

const User = ({ srNo, id, name, email, address, phone, deleteUser, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleOnEditSubmit = (e) => {
    e.preventDefault();
    const { name, email, address, phone } = e.target;
    onEdit(id, name.value, email.value, address.value, phone.value);
    setIsEdit(false);
  };

  return (
    <>
      {isEdit ? (
        <tr>
          <td colSpan="6">
            <form onSubmit={handleOnEditSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor={`name-${id}`}>Name</label></td>
                    <td><input id={`name-${id}`} name="name" defaultValue={name} required className="form-control" /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor={`email-${id}`}>Email</label></td>
                    <td><input id={`email-${id}`} name="email" type="email" defaultValue={email} required className="form-control" /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor={`address-${id}`}>Address</label></td>
                    <td><input id={`address-${id}`} name="address" defaultValue={address} required className="form-control" /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor={`phone-${id}`}>Phone</label></td>
                    <td><input id={`phone-${id}`} name="phone" type="tel" defaultValue={phone} required className="form-control" /></td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <button type="submit" className="btn btn-primary">Update</button>
                      <button type="button" className="btn btn-secondary ms-2" onClick={() => setIsEdit(false)}>Cancel</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </td>
        </tr>
      ) : (
        <tr>
          <td>{srNo}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{address}</td>
          <td>{phone}</td>
          <td>
            <button className="btn btn-success" onClick={() => setIsEdit(true)}>Edit</button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => deleteUser(id)}>Delete</button>
          </td>
        </tr>
      )}
    </>
  );
};

export default User;
