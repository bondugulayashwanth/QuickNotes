import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
//import NoteContext from "../../context/NoteContext";
const TagInput=(props)=>{
    
    const {tags,setTags}= props;   

    //const {notes}= useContext(NoteContext);

    const [inputValue,setinputValue] =  useState("")

    const addTags= async(e)=>{
        e.preventDefault();
        if(inputValue!==""){
            await setTags(tags.concat(inputValue));
            setinputValue("");
        }
    }
    const handleChange= (e)=>{
        setinputValue(e.target.value);
    }
    const deleteTag= (targettag)=>{
       const newtags= tags.filter((tag)=>tag!==targettag);
       setTags(newtags);
    }
    return(
        <div>
            { tags.length!==0 &&
              <div className="flex flex-wrap text-xs text-slate-700 gap-2 ">
                 {tags.map((tag)=>{
                   return <span key={tag}className="bg-slate-200 hover:shadow-md">#{tag} <MdClose className="inline text-base hover:cursor-pointer" onClick={()=>{deleteTag(tag)}}/></span>
                 })}
              </div>
            }
            <div className="flex items-center justify-right gap-3 mt-2">
                <input type="text" placeholder="Add Tags" className="outline-blue-200 text-sm bg-transparent rounded p-2 border" value={inputValue} onChange={handleChange}/>
              <button className="hover:bg-primary hover:rounded" onClick={addTags}>
                <MdAdd className="text-2xl text-blue-700 hover:text-white "/>
              </button>
            </div>
        </div>
    )
}
export default TagInput;