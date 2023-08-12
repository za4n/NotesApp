import {useState , useContext} from 'react';
import { notesContext } from './Context/NotesContextProvider';
 type BarProps = {
   btnsTags : number[],
   btnTagsAdd : (id:number)=>void,
   btnTagsRem : (id:number)=>void,
 }
export default function Bar({btnsTags,btnTagsAdd,btnTagsRem}:BarProps) {
    const {currenttags} = useContext(notesContext); 
    const [listOpen , setListOpen ] = useState<boolean>(false);
  return (
    <>
    <div className="bar">
    <div className="box" onClick={()=>setListOpen(!listOpen)}>
     {currenttags.map(tag=>{if(btnsTags?.includes(tag.id)){return <button key={tag.id} className='btn'>{tag.name} <span onClick={()=>{btnTagsRem?.(tag.id)}} >X</span></button>}})}
     </div>
    {listOpen && <div className='tagList'>
    <span className='close' onClick={()=>{setListOpen(false)}}>X</span>
      <ul> 
        {currenttags.map(tag=><li  key = {tag.id }onClick={()=>{btnTagsAdd?.(tag.id);}}>{tag.name}</li>)}
      </ul>
      </div>}
    </div>
    
    </>
   
    
  )
}
