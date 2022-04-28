import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  // fetch all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/allnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.log("Something went wrong try again");
    }
  }


  // Add a Note
  const addNote = async (title, description, Note_data) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, Note_data })
      });
      // const json = response.json();
      getNotes();
    } catch (error) {
      console.log("Something went wrong try again");
    }
  }

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      // Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // getNotes();
    const newNote = notes.filter((notes) => { return notes._id !== id });
    setNotes(newNote);
    } catch (error) {
      console.log("Something went wrong try again");
    }
  }


  // edit a notes
  const editNote = async (id, title, description, Note_data) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, Note_data })
      });
      getNotes();
    } catch (error) {
      console.log("Something went wrong try again");
    }
  }
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;