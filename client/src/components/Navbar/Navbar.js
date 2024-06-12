import React,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../context/NoteContext";
import Profilecard from "../Cards/ProfileCard";

const Navbar= ()=>{
    const {setuserInfo}= useContext(NoteContext)
    const Navigate= useNavigate();
    const handleLogout= ()=>{
        localStorage.removeItem('token');
        setuserInfo("");
        Navigate('/login');
    }
    return <div>
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl">
            <h2 className="text-xl font-medium text-black py-2">QuickNotes</h2>
            <Profilecard handleLogout={handleLogout}/>
        </div>
    </div>
}

export default Navbar;