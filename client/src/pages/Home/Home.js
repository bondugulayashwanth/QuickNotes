import React, { useState,useContext} from "react";
import AddEditNote from "./AddEditNote";
import { MdAdd } from "react-icons/md";
import Navbar from "../../components/Navbar/Navbar";
import ReactModal  from "react-modal";
import NoteCard from "../../components/Cards/NoteCard";
import NoteContext from "../../context/NoteContext";
const Home = ()=>{

    const [openModal,setopenModal]= useState({
        isopen:false,
        type:"add",
        data:null
    })

    const {notes,setNotes}= useContext(NoteContext);
    
    const onDelete= async(id)=>{
        const newnotes= notes.filter((note)=>{
             return note._id!==id;
        })
        setNotes(newnotes);
        const host="http://localhost:5000"
        const url= `${host}/api/notes/deletenote/${id}`
        await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           "token":localStorage.getItem('token')
           },
        });
    }
    const handleEdit= (note)=>{
         setopenModal({isopen:true, type:"edit", data:note})
    }
    const AddEditNoteButton= ()=>{
         setopenModal({isopen:true, type:"add", data:null})
    }
    return(
        <>
         <Navbar/>
         <button className="rounded-2xl w-16 flex items-center justify-center bg-primary h-16 z-10 shadow-xl hover:bg-blue-600 absolute right-10 bottom-10" onClick={AddEditNoteButton}><MdAdd className="text-[32px] text-white" /></button>
         <div className="container mx-auto">
             <div className="grid grid-cols-3 gap-4 mt-8">
                {notes.map((note)=>{
                    return <NoteCard key={note._id} id={note._id} title={note.title} description={note.description} tags={note.tag}  date={new Date(note.date).toUTCString()} onDelete={onDelete} onEdit={()=>{handleEdit(note)}}/>
                })}
             </div>
         </div>
         <ReactModal
          isOpen={openModal.isopen}
          onRequestClose={()=>{}}
           style={{overlay:{backgroundColor:"rgba(0,0,0,0.2)"}}}
           contentLabel=""
           className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5" >
             <AddEditNote type={openModal.type} noteData={openModal.data} onDiscard={()=>{setopenModal({isopen:false, type:"add", data:null})}}/>
         </ReactModal>

            
        </>
    )
}

export default Home;