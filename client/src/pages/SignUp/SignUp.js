import React, {useState}from "react";
import { Link, useNavigate} from "react-router-dom";
//import Navbar from "../../components/Navbar/Navbar";

const SignUp = ()=>{
    const [credentials,setcredentials]=useState({name:"",email:"",password:"",currpassword:""});
    const [error,seterror]= useState(null);

    const Navigate= useNavigate();
    const handleOnChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
        seterror("");
    }

    const handleSignUp= async(e)=>{
       e.preventDefault();

       if(!credentials.name){
           seterror("Name cannot be Empty");
           return;
       }
       if(!credentials.email){
        seterror("Email cannot be Empty");
        return;
       }
       if(!credentials.password){
        seterror("New Password cannot be Empty");
        return;
       }
       if(!credentials.currpassword){
        seterror("Current New Password cannot be Empty");
        return;
       }
       if(credentials.currpassword!==credentials.password){
        seterror("New Password does not match Current Password");
        return;
       }

       seterror("");


       // Todo - API Call

        const host="http://localhost:5000"
         const url= `${host}/api/auth/createuser`
         const response = await fetch(url, {
           method: "POST",
           headers: {
             "Content-Type": "application/json"
           },
           body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
         });
     
          const resdata= await response.json();
          if(resdata.statusbool){
           Navigate("/login");
          }

    }
    return(
        <div>
           <div className="flex justify-center items-center mt-28 ">
            <div className="w-96 border px-7 py-10 rounded bg-white">
                <form onSubmit={handleSignUp}>
                    <h4 className=" text-2xl text-slate-700 text-center mb-7">SignUp</h4>
                     <input type="text" placeholder="Enter Name" className="input-box" value={credentials.name} name="name" onChange={handleOnChange}/>
                     <input type="text" placeholder="Enter Email" className="input-box" value={credentials.email} name="email" onChange={handleOnChange}/>
                     <input type="password" placeholder="Enter New Password" className="input-box" value={credentials.password} name="password" onChange={handleOnChange}/>
                     <input type="password" placeholder="Enter Current Password" className="input-box" value={credentials.currpassword} name="currpassword" onChange={handleOnChange}/>
                     { error && <p className="text-sm text-center text-red-500">{error}</p>}
                     <button type="submit" className="btn-primary">SignUp</button>
                     <p className="text-sm text-center mt-4">
                            Already Having an Account? 
                            <Link to="/login" className="font-medium text-primary underline">Login</Link>
                        </p>
                </form>
            </div>
           </div>
        </div>
    )
}

export default SignUp;