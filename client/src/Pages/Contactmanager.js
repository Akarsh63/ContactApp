import React,{useState ,useEffect}  from 'react'
import Header from "../Components/Header";
import AddContact from '../Components/AddContact';
import Contactcard from '../Components/Contactcard';
import axios from 'axios';
import { useGetUserID } from '../UserId/Userid';
import '../Components/ontactlist.css';

export default function Contactmanager() {
    const [contacts,setContact]=useState([{
      contactname:"Akarsh R",
      contactnumber:"7842559379",
      contactemail:"akarsh.1@iitj.ac.in"
    },{
      contactname:"Akarsh R",
      contactnumber:"7842559379",
      contactemail:"akarsh.1@iitj.ac.in"
    }]);
    
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const FetchContacts = async () => {
        try {
          const userId=useGetUserID();
          const savedContacts = await axios.get(`http://localhost:4082/home/contacts/${userId}`);
          if(savedContacts.data.savedcontacts){
            // console.log(savedContacts.data.savedcontacts)
            // setContact(savedContacts.data.savedcontacts);
          }
          else{
            setContact([])
          }
          setLoading(false);
        } catch (err) {
          // console.log(2)
          console.log(err);
          setLoading(false);
        }
        
      };
      FetchContacts();
    });
  
  return (
    <div >
        <Header />
    <div>
    <AddContact />
    {/* contact_data={contact_data} */}
    {/* <Contextpasser.Provider value={{}}> */}
    {/* , delete_data: delete_item,update_data_search: search_related_data */}
    {loading ? (
      <p className='loading'>Loading...</p>
    ) : (
      <Contactcard contacts={contacts} />
    )}
    {/* </Contextpasser.Provider> */}
    </div>
    </div>
    
  )
}
