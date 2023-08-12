import {createContext,useState} from 'react';


type NotesContext = {
 currenttags : tag[],
 searchTags : number[],
 addSearchTag : (id:number)=>void,
 remSearchTag : (id:number)=>void,
 change : (id:number , value :string) =>void,
 remTag : (id:number)=>void,
 addNote : (newNote:notestype)=>void,
 notes : notestype[],
 remNote : (id:Number |undefined)=>void,
 upDateNote :(newNote:notestype)=>void,
 addTag  : (n:tag)=>void
}
type tag = {
    id:number,
    name:string
}
 export type notestype = {
  id:number,
  tagArr : number[],
  title:string,
  description :string,
  body:string
}

export const notesContext = createContext<NotesContext>({}as NotesContext);
type NotesContextProviderProps = {
    children : React.ReactNode;
}
function NotesContextProvider({children}:NotesContextProviderProps) {
    const [tags , settags] = useState<tag[]>([]);
    const [searchTags, setSeachTags] = useState <number[]>([]);
    const [notes , setNotes] = useState<notestype[]>([]as notestype[]);

  const addSearchTag = (id:number)=>{
    if(!searchTags.includes(id)){
      setSeachTags(prev=>[...prev,id]);
    }
  }

  const addNote =(newNote:notestype)=>{
     if(!notes.includes(newNote)){
      setNotes(n=>[...n,newNote]);
     }
  }
  const upDateNote =(newNote:notestype)=>{
    
    const {id} = newNote;
    const [delNote] = notes.filter(note=>note.id===id);
    const newNotess = [...notes];
    const index = notes.indexOf(delNote);
    newNotess.splice(index,1,newNote);
    setNotes(newNotess);
 }
  const remNote = (id:Number | undefined)=>{
    if(id) setNotes(previous=>previous.filter(i=>i.id!==id));
  }
  const remSearchTag = (id:number)=>{
    if(searchTags.includes(id)){
      const newList = searchTags.filter(t=>t!==id);
      setSeachTags(newList);
    }
  }
  const remTag = (id:number)=>{
    settags(pre=>pre.filter(i=>i.id!==id))
  }
  const addTag= (newone:tag)=>{
    const old = [...tags];
    if(!old.includes(newone)){
      old.push(newone);
      settags(old);
    }
  }
  

  const change = (id:number , value:string)=>{
    let n:tag[] = [...tags]; 
      n= n.map(item=>
        {
            if(item.id == id){
                item.name = value }
            return item
        }
        )
        settags(n);
  }

 return <notesContext.Provider value={{currenttags:tags, addTag , searchTags : searchTags , addSearchTag,remSearchTag , change,remNote  ,remTag ,addNote ,notes , upDateNote}}>{children}</notesContext.Provider> 
}

export default NotesContextProvider
