import { NavLink, Navigate, useLocation} from "react-router-dom"
import { useState, useContext} from "react";
import './AddNote.css';
import Bar from "./Bar";
import { notesContext} from './Context/NotesContextProvider';

export default function EditNote(){ 
  const id = (useLocation().pathname.split('/')[1]);
   const {notes,upDateNote} = useContext(notesContext);
    const data = notes.find(n=>id === n.id.toString());
   const [title , setTitle] = useState<string>(()=>{ if(data === undefined){return ''}else return data.title} );
   const [description,setD] = useState<string>(()=>{ if(data === undefined){return ''}else return data.description});
    const [body,setBody] = useState<string>(()=>{ if(data === undefined){return ''}else return data.body});
    const [tagArr,setTagArr] = useState<number[]>(()=>{ if(data === undefined){return []}else return data.tagArr});
    const [d , set] = useState(false);
      const add = (id:number)=>{
        if(!tagArr.includes(id)){
          setTagArr(prev=>[...prev,id]);
        }
      }
      const rem = (id:number)=>{
        if(tagArr.includes(id)){
          const newList = tagArr.filter(t=>t!==id);
          setTagArr(newList);
        }
      }
      const updateNode = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
       const newNote = {id:(data?.id || 0),title ,tagArr,description,body}
       upDateNote(newNote);
       set(true);
      
      }
  return (
    <>
     {d  && <Navigate to = '../'></Navigate>}
    <div className="AddNote">
     <span><NavLink to = '../'>X</NavLink></span>
      <form  onSubmit={updateNode} className="form">
       <div className="title">
        <label htmlFor="title">Title</label>
        <input type="text"id="title" value={title} required onChange={(e)=>{setTitle(e.target.value)}} />
       </div>
       <div className="description">
        <label htmlFor="desc">Description </label>
        <input  type="text" value={description} id = 'desc' max={25} onChange={(e)=>{setD(e.target.value)}} />
       </div>
       <div className="body">
        <p>Body</p>
        <textarea  required name="" value={body} id="body" onChange={(e)=>{setBody(e.target.value)}}  ></textarea>
       </div>
       <div className="bar">
       <Bar btnsTags={tagArr} btnTagsAdd={add} btnTagsRem={rem} ></Bar>
       </div>
      
       
       <button type='submit'>Finalize</button>
      </form>
    </div> 
   
    </>
    
    
 
    
  )
}
