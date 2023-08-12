import { notesContext } from './Context/NotesContextProvider';
import { useState, useContext , useRef } from "react";
import { Navigate } from 'react-router';

import { notestype } from './Context/NotesContextProvider';
import './AddNote.css';

type AddNoteProp = {} | notestype;
export default function AddNote({}:AddNoteProp) {
  const [tags , setTags] =  useState<number[]>(()=>[]);
   const name = useRef<HTMLInputElement>(null!);
   const description = useRef<HTMLInputElement>(null!);
   const BODY = useRef<HTMLTextAreaElement>(null!);
   const [d , isD]=  useState<boolean>(false);
  const {currenttags , notes,addNote} = useContext(notesContext);
   const add = (id:number)=>{
    if(!tags.includes(id)){
        setTags((prev)=>[...prev,id]);
    }
    else if (tags.includes(id)){
        setTags((p)=>p.filter(i=>i!==id))
    }
   }

   const createNode = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const n:notestype = { id:notes.length+1,tagArr :tags , title:name.current.value,description:description.current.value,body:BODY.current.value };
    addNote(n);
    name.current.value ='';
    description.current.value = '';
    BODY.current.value = '';
    setTags([]);
    isD(true);
   }

   const close = ()=>{
    name.current.value ='';
    description.current.value = '';
    BODY.current.value = '';
    setTags([]);
    isD(true);
   }
   
     
  return (
    
    <>
    {(tags.length <=0 && d)  && <Navigate to = '../'></Navigate>}
    <div className="AddNote">
        <span onClick={close}>X</span>
      <form  onSubmit={createNode} className="form">
       <div className="title">
        <label htmlFor="title">Title </label>
        <input type="text" ref={name} id="title" required/>
       </div>
       <div className="description">
        <label htmlFor="desc">Description </label>
        <input ref={description} type="text" id = 'desc' max={25}/>
       </div>
       <div className="body">
        <p>Body</p>
        <textarea ref={BODY} required name="" id="body" ></textarea>
       </div>
       <div className="tags">
        <p>Add Tags</p>
         <ul>
           {currenttags.map(tag=>{ return <li style={{backgroundColor : tags.includes(tag.id)?"black":"green"}} onClick={()=>{add(tag.id)}} key={tag.id}>{tag.name}</li>})}
         </ul>
       </div>
       <button type='submit'>Finalize</button>
      </form>
      
    </div>
   
    </>
    
  )
}
