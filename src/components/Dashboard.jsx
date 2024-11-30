import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve token and user info from localStorage
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("user");

    if (!token || !userInfo) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(userInfo));
      fetchUsers(token);
    }
  }, [navigate]);

  const fetchUsers = async (token) => {
    try {
      const response = await axios.get("https://quantum-backend-wpyn.onrender.com/api/auth/all-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Dashboard</h2>
        {currentUser && (
          <div className="welcome-section">
            <p><strong>Welcome, {currentUser.name}!</strong></p>
            <p>Email: {currentUser.email}</p>
            <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {users.length > 0 && (
          <Table striped className="dashboard-table">
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Date of Birth</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={tableCellStyle}>{user.name}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>{user.dob}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  borderBottom: "2px solid #ddd",
  padding: "10px",
  textAlign: "left",
  backgroundColor: "#444",
  color: "#fff",
  fontWeight: "bold",
};

const tableCellStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px",
  color: "#fff",
};

export default Dashboard;
