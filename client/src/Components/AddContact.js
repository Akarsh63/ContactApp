import React, { useState } from 'react';
import './addcontactlist.css';
import { useGetUserID } from '../UserId/Userid';
import axios from 'axios';

const AddContact = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const userId = useGetUserID();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const user = await axios.post(`http://localhost:4082/home/contacts/${userId}`, {
        name,
        number,
        email,
        userid: userId,
      });
      console.log(user);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
    }
    setName('');
    setNumber('');
    setEmail('');
  };

  return (
    <div className="maina">
      <h2 className="head_con">Add Contact</h2>
      <form className="form_con" onSubmit={submitHandler}>
        <div className="field">
          <label>Contact Name:</label>
          <br />
          <input
            type="text"
            placeholder="Contact Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Contact Number:</label>
          <br />
          <input
            type="number"
            placeholder="Contact Number"
            name="number"
            value={number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label>Email:</label>
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ width: '100%' }} className="addsub">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
