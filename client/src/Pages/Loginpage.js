import React,{useState}  from 'react'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './login.css'
// import Userid from '../UserId/Userid';

export default function Loginpage({ handleFlip,setIsHovered }) {
  const [_, setCookies] = useCookies(["access_token"]);
   const [logininfo,setLogninfo]=useState({
     username:'',
     password:'',
   })
   const navigate = useNavigate();
   const handlechange = (event) => {
    const { name, value } = event.target;
    setLogninfo({ ...logininfo, [name]: value });
  };
  const  onsubmit= async (e)=>{
    e.preventDefault();
    try{
      // console.log(logininfo)
      const {username,password}=logininfo;
      // console.log(username)
      const user = await axios.post('http://localhost:4082/users/login',{username,password});
      setCookies("access_token", user.data.token);
      sessionStorage.setItem("userID", user.data.userId);
      
      console.log(user.data.userId);
      // <Userid userId={user.data.userId} />
      // export const userID=user.data.userId;
      navigate('/Contactmanager')
    }
    catch(err){
        console.log(err);
        alert(err.response.data.message)
    }
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  }
  return (
       <div className='logincontainer'>
          <div className='greeting'>
           Login Page
          </div>
          <div className='form'>
            <form onSubmit={onsubmit}>
              <div className='formgrp'>
                 
                 <input value={logininfo.username} onChange={handlechange} type='text' name='username'id='username' required/>
                 <label for='username'>User Name</label>
              </div>
              <div className='formgrp'>
                 
                 <input value={logininfo.password} onChange={handlechange} type='password' name='password'id='password' required/>
                 <label for='password'>Password</label>
              </div>
              <div id="button">
                  
                <button type='submit' className='authbut' onMouseEnter={()=>{setIsHovered(true)}}
        onMouseLeave={()=>{setIsHovered(false)}}>Login</button>
              </div>
              
            </form>
          </div>
          <div className='swap'> 
            Don't have an account?<Link onClick={handleFlip}>Register</Link>
          </div>
       </div>
   
  )
}
