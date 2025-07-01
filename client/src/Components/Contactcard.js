import React, { useEffect, useState} from 'react'
import Contactlist from './ontactlist';
import '../Components/contactlist.css'
export default function Contactcard (props) {
  
  const [search,Setsearch]=useState("");
  const [searchcontacts,setsearchcontacts]=useState(props.contacts);

  useEffect(()=>{
    const Search_related_data =async ()=>{
      console.log(search)
      if(search===""){
        setsearchcontacts(props.contacts)
        // console.log(searchcontacts)
      }
      else{
        const allcontacts=props.contacts;
        const searchrelated=allcontacts.filter(post => {
            if (post.contactname.toLowerCase().includes(search.toLowerCase())) {
              return post;}
        })
        setsearchcontacts(searchrelated);
      }
      }
    Search_related_data()
  },[search,props.contacts])
  
  const clearinput =(event)=>{
    event.preventDefault();
    Setsearch('');
  }
  return (
    <div style={{backgroundColor:'#fcfaf8',paddingBottom:'30px'}}>
      <div className='formsearch'>
        <form  className='s' onSubmit={clearinput}>
            <input type='text'className='searchcontactcss' name="search" placeholder='CONTACT NAME' value={search} onChange={(e)=>{Setsearch(e.target.value)}}/>
            {/* <button type='button'className='searchbut'>Clear</button> */}
            <button type='submit'className='searchbut' >Clear</button>
        </form>
      </div>
       {/* <Contextpasser.Consumer >
                {(value) => ( */}
        
        <Contactlist contacts={searchcontacts} display_test={search}/>
                {/* )}
       </Contextpasser.Consumer> */}
    </div>
  );
}
