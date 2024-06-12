import React, { useState,useContext } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import NoteContext from "../../context/NoteContext";
const AddEditNote= ({noteData,type, onDiscard})=>{
    const [inputval,setinputval]= useState({title:noteData?.title||"",description:noteData?.description||""});
    const [tags,setTags]= useState(noteData?.tag ||[]);
    const [error,setError]= useState(null);
    const {notes,setNotes}= useContext(NoteContext);
    const handleInputChange= (e)=>{
       setinputval({...inputval,[e.target.name]:e.target.value})
    }

    const editNotes= async()=>{
        // todo API CALL TO EDIT NOTES
        
        try{
            const host="https://quicknotes-mq32.onrender.com"
            const url= `${host}/api/notes/updatenote/${noteData._id}`
            const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
               "token":localStorage.getItem('token')
               },
               body:JSON.stringify({title:inputval.title,description:inputval.description,tag:tags})
            });
            const resdata= await response.json();
            const newnotes= notes.map((note)=>{
                if(note._id!==resdata._id) return note;
                else return resdata
            })
            setNotes(newnotes);
        }
        catch(err){
            setError("error has occurred",err);
        }
    }

    const addNotes= async()=>{
        // todo API CALL TO ADD NOTES
        
        try{
            const host="https://quicknotes-mq32.onrender.com"
            const url= `${host}/api/notes/addnote`
            const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
               "token":localStorage.getItem('token')
               },
               body:JSON.stringify({title:inputval.title,description:inputval.description,tag:tags})
            });
            const resdata= await response.json();
            setNotes(notes.concat(resdata));
            
        }
        catch(err){
           setError("error has occurred",err);
        }
    }
    const handleAddNote= (e)=>{
        e.preventDefault();
         if(!inputval.title){
            setError("Enter Title");
            return;
         }

         if(!inputval.description){
            setError("Enter Description");
            return;
         }
         setError("");

         if(type==="edit"){
            editNotes();
         }
         else addNotes();

         onDiscard();
    }
    return (
        <>
          <div className="relative">
               <button className="w-8 h-8 flex justify-center items-center absolute top-0 right-0 hover:rounded-full hover:bg-slate-300 text-slate-800" onClick={onDiscard}><MdClose/></button>
                <form onSubmit={handleAddNote}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="" className="input-label">Title</label>
                        <input type="text" className="text-2xl text-slate-950 outline-none" placeholder="Title" onChange={handleInputChange} name="title" value={inputval.title} />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label  className="input-label">Description</label>
                        <textarea type="text" className="outline-none text-slate-950 text-sm bg-slate-50 p-2 rounded" placeholder="Desciption" rows={10} onChange={handleInputChange} name="description" value={inputval.description} ></textarea>
                    </div>
                    <div>
                        <label htmlFor="" className="input-label">Tags</label>
                        <TagInput tags={tags} setTags={setTags}/>
                    </div>
                    {error  && <p className="text-red-400">{error}</p>}
                    <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>{(type==="add")?"ADD":"UPDATE"}</button>
                </form>
         </div>
        </>
    )
}

export default AddEditNote;
