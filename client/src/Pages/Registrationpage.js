
import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";

export default function Registrationpage({ handleFlip,setIsHovered }) {
   const [Registrationinfo,setRegistraioninfo]=useState({
     username:'',
     email:'',
     password:'',
     confirmpassword:''
   })
   const [page,setpage]=useState(0);
   const navigate = useNavigate();
   const handlechange = (event) => {
    const { name, value } = event.target;
    setRegistraioninfo({ ...Registrationinfo, [name]: value });
  };
  const  onsubmit= async (e)=>{
    e.preventDefault();
    try{
      // console.log(logininfo)
      const {username,password,confirmpassword,email}=Registrationinfo;
      // console.log(username)
      const user = await axios.post('http://localhost:4082/users/register',{username,password,confirmpassword,email});
      console.log(user)
      // setpage(1);
      alert('User added Successfully!')
      setRegistraioninfo({
        username:'',
        email:'',
        password:'',
        confirmpassword:''
      })
      handleFlip()
    }
    catch(err){
        console.log(err.response.data.message);
        alert(err.response.data.message)
    }
  }
  return (
    
       <div className='logincontainer'>
          <div className='greeting'>
            Registration Page
          </div>
          <div className='form'>
            <form onSubmit={onsubmit}>
              <div className='formgrp'>
                 
              <input value={Registrationinfo.username} onChange={handlechange} type='text'name='username' required/>
                 <label for='username'>User Name</label>
              </div>
              <div className='formgrp'>
                 
              <input value={Registrationinfo.email} onChange={handlechange} type='text'name='email' required/>
                 <label for='email'>Email</label>
              </div>
              <div className='formgrp'>
                 
              <input value={Registrationinfo.password} onChange={handlechange} type='password'  name='password' required/>
                 <label for='password'>Password</label>
              </div>
              <div className='formgrp'>
                 
              <input value={Registrationinfo.confirmpassword} onChange={handlechange} type='password'  name='confirmpassword' required/>
                 <label for='confirmpassword'>Confirm Password</label>
              </div>
              <div id="button">
                  <button type='submit' className='authbut' onMouseEnter={()=>{setIsHovered(true)}}
        onMouseLeave={()=>{setIsHovered(false)}}>Register</button>
              </div>
            </form>
          </div>
          <div className='swap'> 
            Already a member?<Link onClick={handleFlip}>Login</Link>
          </div>
       </div>
    
  )
}
