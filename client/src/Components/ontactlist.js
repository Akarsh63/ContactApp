import React, { useState } from 'react';
import './ontactlist.css';
// import {FaRegTrashAlt} from "react-icons/fa";
import axios from 'axios';
import { useGetUserID } from '../UserId/Userid';

const Contactlist = (props) => {
    const [details, setdetails] = useState({});
    const [update, setupdate] = useState('0');
    const userId = useGetUserID();
  
    const removeItem = async (key, userId) => {
      try {
        await axios.put(`http://localhost:4082/home/delete`, { key, userId });
      } catch (err) {
        console.log(err);
      }
    };
  
    const updateItem = async (key,event) => {
      event.preventDefault();
        console.log(123)
      try {
        const response= await axios.put(`http://localhost:4082/home/update/${key}`,{details});
        setdetails({});
        setupdate('0');
      } catch (err) {
        console.log(err);
      }
    };
  
    const renderupdateItem = () => {
      return (
        <form className='updateform' onSubmit={()=>updateItem(details._id)}>
            <div className='updateformt'>
                <input
                type="text"
                placeholder="Contact Name"
                value={details.contactname}
                name="contactname"
                onChange={(e) => setdetails({ ...details, [e.target.name]: e.target.value })}
                />
                <input
                type="text"
                placeholder="Contact Email"
                value={details.contactemail}
                name="contactemail"
                onChange={(e) => setdetails({ ...details, [e.target.name]: e.target.value })}
                />
                <input
                type="text"
                placeholder="Contact Number"
                value={details.contactnumber}
                name="contactnumber"
                onChange={(e) => setdetails({ ...details, [e.target.name]: e.target.value })}
                />
            </div>
            <div className='updateforms'>
              <input type="button" value="CANCEL" onClick={()=>{setupdate(false)}} />
               <input type="submit" value="UPDATE" />
            </div>
          
        </form>
      );
    };
  
    const renderContactlist = props.contacts.map((contact, index) => {
      return (
        <div key={index}>
          <div className="container_card">
            {update === contact._id ? (
              renderupdateItem()
            ) : (
              <>
                <div className="details">
                    <div className='profile'>
                      <div className='s'>{contact.contactname[0].toUpperCase()}</div>
                  </div>
                  <div className="detailss">
                      <h3>{contact.contactname}</h3>
                      <h4>Email: {contact.contactemail}</h4>
                      <h5>{contact.contactnumber}</h5>
                  </div>
                  
                </div>
                <div className="icons">
                  <button onClick={() =>{setdetails(contact);setupdate(contact._id)}} className='edit'>EDIT</button>
                  <button onClick={() => removeItem(contact._id, userId)} className='remove'>DELETE</button>
                  {/* <FaRegTrashAlt
                    className="icon_remove"
                    color="red"
                    style={{ fontSize: "20px" }}
                    onClick={() => removeItem(contact._id, userId)}
                  /> */}
                </div>
              </>
            )}
          </div>
        </div>
      );
    });
  
    return (
      <div className="con_list">
        {props.contacts.length === 0 ? (
          props.display_test === "" ? (
            <p className="nocontacts">No Contacts Added Yet!</p>
          ) : (
            <p className="nocontacts">Search related contacts not found!</p>
          )
        ) : (
          renderContactlist
        )}
      </div>
    );
  };
  
  export default Contactlist;
  