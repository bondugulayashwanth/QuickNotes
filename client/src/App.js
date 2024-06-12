import React from "react";
import { Routes,Route,Navigate} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import NoteState from "./context/NoteState";
import { BrowserRouter } from 'react-router-dom';
const App= ()=> {
   
  return (
         <NoteState>
         <BrowserRouter>
            <Routes>
               <Route exact path="/" element= {<Navigate to ="/login"/>}></Route>
               <Route exact path ="/dashboard" element={<Home/>}></Route>
               <Route exact path ="/login" element={<Login/>}></Route>
               <Route exact path ="/signup" element={<SignUp/>}></Route>
            </Routes>
            </BrowserRouter>
         </NoteState>
  );
}

export default App;
