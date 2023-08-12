import { useParams ,NavLink, Navigate } from "react-router-dom"
import { notesContext } from "./Context/NotesContextProvider";
import {useContext} from 'react';
export default function Note() {
  const {notes , remNote} = useContext(notesContext);
  const {id} = useParams();
   const [note] = notes.filter(n=>id===n.id.toString())
  return (  
<>
{note==undefined && <Navigate to ='../'></Navigate>}
<div className="bar">
   <ul>
    <button><NavLink to ='./edit'>Edit</NavLink></button>
    <button onClick={()=>remNote(note?.id)}>Delete</button>
    <button><NavLink to = '../'>Back</NavLink></button>
    </ul> 
</div>

 {note !==undefined &&<div className="noteBox">
        <div className="title"><h3>{note?.title}</h3></div>
        <div className="description"><p>{note?.description}</p></div>
        <div className="body"><p>{note?.body}</p></div>
    </div>}
</>

    
  )
}
