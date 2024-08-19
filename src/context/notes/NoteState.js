import { useState } from "react";
import NoteContext from "./noteContext.js";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []

  //get all nodes
  const getNotes = async () => {
    //todo api calls: done
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
        
      }
    );
    const json= await response.json();
    
    setNotes(json)
   
   
  };


  


  const [notes, setNotes] = useState(notesInitial);
  // adding a note
  const addNote = async (title, description, tag) => {
    //todo api calls
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),
      }
    );
    const note= await response.json();
    
    //
  
    setNotes(notes.concat(note));
  };
  // delete a note

  const deleteNote =async (_id) => {
    //todo: api calls
    const response = await fetch(
      `${host}/api/notes/deletenote/${_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        }
       
      }
    );


    
    const newNotes = notes.filter((notes) => {
      return _id !== notes._id;
    });
    setNotes(newNotes);
  };
  // update a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}),
      }
    );
    const json= await response.json();
    console.log(json)
     
    let newNote=JSON.parse(JSON.stringify(notes));
    //logic part
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
