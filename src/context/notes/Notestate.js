import React, { useState } from 'react';
import Notecontext from './Notecontext';

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [
    
  ]
  const [notes, setNotes] = useState(notesInitial)
  //get Note
  const getNote = async () => {
    //Api Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
   
    const json=await response.json()
    console.log(json)
    setNotes(json)
    
  }
  // Add a Note 
  const addNote = async (title, description, tag) => {
    //Api Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note= await response.json()
    setNotes(notes.concat(note))
  }
  //Delete a Note

  const deleteNote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = response.json();
    console.log(json)
    //for client
    console.log("Deleting the note with id " + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit a Note

  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json =await response.json();
    console.log(json)

    let newnotes=JSON.parse(JSON.stringify(notes))
    //Edit from the client side
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
         break;
      }
     

    }
    setNotes(newnotes);
  }


  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </Notecontext.Provider>
  )
}
export default NoteState