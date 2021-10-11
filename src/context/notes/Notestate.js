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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MzAxNzRkYzVmNTA3ZmJjYmZmYjQ3In0sImlhdCI6MTYzMzg3ODM4OH0.zxJkgEwQF408qOP5X0DMsNpkcjvfCQYl_j-o8dYFaXs"
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MzAxNzRkYzVmNTA3ZmJjYmZmYjQ3In0sImlhdCI6MTYzMzg3ODM4OH0.zxJkgEwQF408qOP5X0DMsNpkcjvfCQYl_j-o8dYFaXs"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = [{
      "_id": "61322f19553781ak8ca80e08",
      "user": "6131dc5e3e4037cd4734a066",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    },
    ]
    setNotes(notes.concat(note))
  }
  //Delete a Note

  const deleteNote = async(id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MzAxNzRkYzVmNTA3ZmJjYmZmYjQ3In0sImlhdCI6MTYzMzg3ODM4OH0.zxJkgEwQF408qOP5X0DMsNpkcjvfCQYl_j-o8dYFaXs"
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MzAxNzRkYzVmNTA3ZmJjYmZmYjQ3In0sImlhdCI6MTYzMzg3ODM4OH0.zxJkgEwQF408qOP5X0DMsNpkcjvfCQYl_j-o8dYFaXs"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    //Edit from the client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }


  return (
    <Notecontext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </Notecontext.Provider>
  )
}
export default NoteState