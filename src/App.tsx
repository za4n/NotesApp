import { createBrowserRouter , createRoutesFromElements , Route , RouterProvider } from "react-router-dom";
import NotesHead from "./Components/NotesHead";
import './main.css'
import NotesContextProvider from "./Components/Context/NotesContextProvider";
import AddNote from "./Components/AddNote";
import Note from "./Components/Note";
import EditNote from "./Components/EditNote";



const router  = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element = {<NotesHead></NotesHead>}></Route>
    <Route path="/:id" element ={<Note></Note>}></Route>
    <Route path="/:id/edit" element ={<EditNote></EditNote>}></Route>
    <Route path="/create" element = {<AddNote></AddNote>}></Route>
    </Route>
    )
)

export default function App(){
 
  return (
  <NotesContextProvider>
 <RouterProvider router={router}></RouterProvider>
  </NotesContextProvider>
    
  );
}

