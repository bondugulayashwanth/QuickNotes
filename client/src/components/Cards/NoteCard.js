import React from "react";

import { MdCreate,MdDelete } from "react-icons/md";

const NoteCard= ({id,title, description,tags,date,onEdit,onDelete})=>{
      return (
        <div className="border rounded p-4 bg-blue-200 hover:shadow-xl">
           <div>
              <h6 className="text-sm font-medium">{title}</h6>
              <span className="text-xs text-slate-500">{date}</span>
           </div>

           <p className="text-xs text-slate-600 mt-2">{description}</p>

           <div className="flex items-center justify-between mt-2">
                <div className="flex flex-row flex-wrap">
                {tags.length!==0 && tags.map((tag)=>{return  <div key={tag} className="text-xs text-slate-500">&nbsp; #{tag}</div>})}
                </div>
                 <div className="flex items-center gap-2">
                     <div>
                        <MdCreate className="icon-btn  hover:text-green-600 hover:cursor-pointer" onClick={onEdit}/>
                     </div>
                     <div>
                        <MdDelete className="icon-btn hover:text-red-500 hover:cursor-pointer" onClick={()=>{onDelete(id)}}/>
                     </div>
                 </div>
           </div>
      </div>
      )
}

export default NoteCard;
