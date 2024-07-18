// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import AddUser from "./Components/AddUser";
import User from "./Components/User";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loggedIn, setLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addUser = async (name, email, address, phone) => {
    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: JSON.stringify({ name, email, address, phone }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });

      if (res.status === 201) {
        const data = await res.json();
        setUsers((prevUsers) => [...prevUsers, data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      if (res.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = async (id, name, email, address, phone) => {
    try {
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, email, address, phone }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
        const data = await res.json();
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? data : user)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogin = () => {
    // Simulated login
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear user session data
    sessionStorage.removeItem('user');
    // Reset login state
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/users"
            element={loggedIn ? (
              <div className="container">
                <h2>CRUD operations with JSON Placeholder</h2>
                <AddUser addUser={addUser} />
                <table className="table">
                  <thead>
                    <tr>
                      <th>SR No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Edit User</th>
                      <th>Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user, index) => (
                      <User
                        key={user.id}
                        srNo={index + 1 + (currentPage - 1) * usersPerPage}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        address={user.address}
                        phone={user.phone}
                        deleteUser={deleteUser}
                        onEdit={onEdit}
                      />
                    ))}
                  </tbody>
                </table>
                <nav>
                  <ul className="pagination justify-content-center">
                    {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
