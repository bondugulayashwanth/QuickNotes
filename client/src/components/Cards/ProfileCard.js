import React,{useContext} from "react";

import NoteContext from "../../context/NoteContext";
const Profilecard=(props)=>{
    

  const {userInfo}= useContext(NoteContext);
    const getInitials= (str)=>{
        let initials=str[0];
        for(let c =1;c<str.length;c++){
            if(str[c]===' '){
               initials+=str[c+1];
            }
        }
        return  initials.toUpperCase();
    }

  return(
    <div className="flex items-center gap-3">
       <div className="w-12 h-12 flex items-center justify-center rounded-full font-medium bg-slate-300">
       {userInfo&& getInitials(userInfo)}
       </div>
      <div>
         <p>{userInfo&& userInfo}</p>
         <button className="text-sm underline text-primary hover:text-blue-700" onClick={props.handleLogout}>Logout</button>
      </div>

    </div>
  )
}
export default Profilecard;