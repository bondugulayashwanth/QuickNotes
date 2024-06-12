import React , {useState,useContext}from "react";
//import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

import NoteContext from "../../context/NoteContext";
const Login = ()=>{

    // setting the state called credentials for Login Form
    const [credentials,setcredentials]=useState({email:"",password:""})
    const [error,seterror]= useState(null);

     // Using the imported Notecontext
  
     const {fetchNotes,getUserInfo}= useContext(NoteContext);


    const Navigate= useNavigate();
    const handleOnChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    const handleLogin= async(e)=>{
        e.preventDefault();

        if(!credentials.email){
            seterror("Email Cannot be Empty");
            return;
        }

        if(!credentials.password){
            seterror("Password Cannot be Empty");
            return;
        }
        
        seterror("");
        //  todo - API Call 

         // Example POST method implementation:
      try{
        const host="http://localhost:5000"
        const url= `${host}/api/auth/login`
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        });
    
         const resdata= await response.json();
          if(resdata.statusbool){
              localStorage.setItem("token",resdata.token);
              Navigate("/dashboard");
              fetchNotes();
              getUserInfo();

          }
          else{
              seterror(resdata);
          }
      }
      catch(error){
        seterror("Something went wrong. Please try again.");
      }
    }
    
    return(
        <div>
            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7 text-center text-slate-700">Login</h4>
                        <input type="text" placeholder="Enter Email"  className="input-box" name="email" onChange={handleOnChange} value={credentials.email}/>
                        <input type="password" placeholder="Enter Password" className="input-box" name="password" onChange={handleOnChange} value={credentials.password}/>
                        { error && <p className="text-sm text-center text-red-500">{error}</p>}
                        <button type="submit" className="btn-primary">Login</button>
                        <p className="text-sm text-center mt-4">
                            Not registered yet? 
                            <Link to="/signup" className="font-medium text-primary underline">Create an Account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login