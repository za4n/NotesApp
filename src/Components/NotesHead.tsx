import { useState, useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NoteHead.css";

import { notesContext } from "./Context/NotesContextProvider";
import Bar from "./Bar";
export default function NotesHead() {
  const {
    currenttags,
    searchTags,
    addSearchTag,
    remSearchTag,
    change,
    remTag,
    addTag,
    notes,
  } = useContext(notesContext);
  const [tab, setTab] = useState(false);
  const [n, setN] = useState("");
  const newTag = useRef<HTMLInputElement>(null!);

const addNewTag = ()=>{
 if(newTag.current.value !==''){
  let name = newTag.current.value;
  let id = currenttags.length+1;
  addTag({id,name});
 }
}


{notes.forEach((n,i)=>console.log(i+" "+n.tagArr))}
  return (
    
    <>
      <div className="nav">
        <nav>
          <div className="heading">Notes</div>
          <div className="searchs">
            <input
              type="text"
              value={n}
              onChange={(e) => {
                setN(e.target.value);
              }}
            />
            <div className="bar">
              <Bar
                btnsTags={searchTags}
                btnTagsAdd={addSearchTag}
                btnTagsRem={remSearchTag}
              ></Bar>
            </div>
          </div>
          <div className="navBtns">
            <button onClick={() => setTab(!tab)}>Create & EditTag</button>
            <button>
              <NavLink to="/create">CreatNote</NavLink>
            </button>
          </div>
        </nav>
        {tab && (
          <div className="tab">
            <span className="closeTab" onClick={() => setTab(false)}>
              X
            </span>
            <input type="text" placeholder="Enter name of new Tag" ref = {newTag} />
            <div className="display">
              <ul>
                {currenttags.map((tag) => (
                  <p>
                    <input
                      key={tag.id}
                      onChange={(e) => {
                        change(tag.id, e.target.value);
                      }}
                      value={tag.name}
                    ></input>
                    <span
                      onClick={() => {
                        remTag(tag.id);
                      }}
                    >
                      X
                    </span>
                  </p>
                  
                ))}
              </ul>
            </div>
            <button onClick={addNewTag}>Create</button>
          </div>

        )}
        
      </div>

      <div className="notes">
        
        
     {notes.filter((note) => (note.title.toUpperCase().includes(n) || note.title.toLowerCase().includes(n) ) && (searchTags.every(n=>note.tagArr.includes(n)))).map((note) => (
    <div className="note" key={note.id}>
     <div className="heading">
      <h3>
       <NavLink to={`${note.id}`.toString()}>{note.title}</NavLink>
      </h3>
    </div>
    <div className="desc">{note.description}</div>
    <div className="tags">
      {currenttags.map((tag) => {
        if (note.tagArr.includes(tag.id))
          return <p key={tag.id}>{tag.name}</p>;
      })}
    </div>
  </div>
))}

        
      </div>
    </>
  );
}
