import React, { useState } from "react";
import axios from "axios";
import "./UserModal.css";

const UserModal = ({ user, setUsers, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      email,
      phone,
      address,
    };

    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, updatedUser)
      .then((res) => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? res.data : u)));
        onClose();
      })
      .catch(() => {
        alert("Failed to update user.");
      });
  };

  return (
    <div className="modal">
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <input
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserModal;
