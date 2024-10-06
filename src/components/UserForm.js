import React, { useState } from "react";
import axios from "axios";
import "./UserForm.css";

const UserForm = ({ setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ street: "", city: "" });
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !address.street || !address.city) {
      alert("Please fill in all required fields");
      return;
    }

    const newUser = {
      name,
      email,
      phone,
      username: `USER-${name.replace(/\s+/g, "")}`,
      address,
      company: { name: company },
    };

    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        setUsers((prev) => [...prev, res.data]);
        alert("User created successfully");
      })
      .catch(() => {
        alert("Failed to create user");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Street"
        value={address.street}
        onChange={(e) => setAddress({ ...address, street: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => setAddress({ ...address, city: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Company (Optional)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
