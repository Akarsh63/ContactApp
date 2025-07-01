// import React, { useState } from 'react';
// import './addcontactlist.css';
// import { useGetUserID } from '../UserId/Userid';
// import axios from "axios";

// const EditContact = (props) => {
//     // {contact_data}
// const [name, setName] = useState(props.contact.contactname);
// const [number, setNumber] = useState(props.contact.contactnumber);
// const [email, setEmail] = useState(props.contact.contactemail);
// const userId=props.userId;
// const handleChange = (event) => {
//     const { name, value } = event.target;
//         if (name === 'name') {
//         setName(value);
//         } else if (name === 'number') {
//         setNumber(value);
//         } else if (name === 'email') {
//         setEmail(value);
//         }
// };

// const submitHandler = async (event) => {
//     event.preventDefault();
//     try{
//         const user = await axios.post(`http://localhost:8082/home/contacts/${props.key}`,{name,number,email});
//         console.log(user)
//       }
//       catch(err){
//           console.log(err);
//           alert(err)
//       }
//     // contact_data({ name, number, email });
//     setName('');
//     setNumber('');
//     setEmail('');
// };

// return (
// <div className='main'>
// <h2 className="head_con">Add Contact</h2>
// <form className='form_con' onSubmit={submitHandler}>
// <div className='field'>
// <label>Contact Name:</label><br/>
// <input type='text' placeholder='Contact Name' name="name" value={name} onChange={handleChange} required/>
// </div>
// <div className='field'>
// <label>Contact Number:</label><br/>
// <input type='number' placeholder='Contact Number' name="number" value={number} onChange={handleChange} required/>
// </div>
// <div className='field'>
// <label>Email:</label><br/>
// <input type='email' placeholder='Email' name="email" value={email} onChange={handleChange} required/>
// </div>
// <div style={{ width: "100%" }}>
// <button type="submit">Add</button>
// </div>
// </form>
// </div>
// );
// };

// export default AddContact;

rfc