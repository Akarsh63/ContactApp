import React,{useState,useEffect} from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useGetUserID } from '../UserId/Userid';
const Header = ()=>{
    const userId=useGetUserID();
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserName = async () => {
          try {
            const response = await axios.get(`http://localhost:4082/users/home/${userId}`);
            const user = response.data;
            setUserName(user);
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchUserName();
      }, [userId]);
      const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
      };
    return (
        <div className='menu'>
             <div className='container_header' >
              <div>
                  <h1>Hello {userName}</h1>
                  {/* <h2>Contact Manager</h2> */}
              </div>
                  <button onClick={handleLogout} className='out'>LOGOUT</button>
             </div>
             
        </div>
    )
}
export default Header