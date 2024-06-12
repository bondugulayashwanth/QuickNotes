import React,{useState,useEffect} from 'react';

import noteContext from './NoteContext';

const NoteState= (props)=>{
     
    const [notes,setNotes]= useState([]);

    const [userInfo,setuserInfo]= useState("");

    const getUserInfo=async()=>{
       const host="https://quicknotes-mq32.onrender.com"
       const url= `${host}/api/auth/getuser`
       const response = await fetch(url, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
          "token":localStorage.getItem('token')
          },
       })
       const resdata= await response.json();
       setuserInfo(resdata.user.name);
 
     }
     useEffect(()=>{
      const token= localStorage.getItem('token');
           if(token)
           getUserInfo();
     },[])
     
     const fetchNotes= async()=>{
      const host="https://quicknotes-mq32.onrender.com"
      const url= `${host}/api/notes/fetchallnotes`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           "token":localStorage.getItem("token")
        },
      });
      const resdata= await response.json();
      setNotes(resdata);
   }

   useEffect(()=>{
    const token= localStorage.getItem('token');
         if(token){
         getUserInfo();
         fetchNotes();
         }
   },[])
   

    return(
      <noteContext.Provider value={{notes,setNotes,userInfo,setuserInfo,getUserInfo,fetchNotes}}>
        {props.children}
      </noteContext.Provider>
     )
}

export default NoteState;


