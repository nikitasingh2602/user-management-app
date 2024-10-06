import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import UserModal from "./UserModal";
import Spinner from "./Spinner"; // Loading spinner component
import "./Home.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserFormOpen, setIsUserFormOpen] = useState(false); // Modal state for adding users

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(() => {
          const newUsers = users.filter((user) => user.id !== id);
          setUsers(newUsers);
          setFilteredUsers(newUsers);
        })
        .catch(() => {
          alert("Failed to delete user.");
        });
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredUsers(
      users.filter((user) => user.name.toLowerCase().includes(value))
    );
  };

  const openUserFormModal = () => {
    setIsUserFormOpen(true);
  };

  const closeUserFormModal = () => {
    setIsUserFormOpen(false);
  };

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>User List</h3>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", padding: "8px", width: "300px" }}
      />
      <button onClick={openUserFormModal} className="add-user-btn">
        Add User
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  <Link to={`/user/${user.id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {editingUser && (
        <UserModal
          user={editingUser}
          setUsers={setUsers}
          onClose={() => setEditingUser(null)}
        />
      )}

      {/* Modal for adding new users */}
      {isUserFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <UserForm setUsers={setUsers} />
            <button className="close-btn" onClick={closeUserFormModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
