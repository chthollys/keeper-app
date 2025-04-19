import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotesList from "./NotesList"
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from "uuid";

// The App component serves as the main container for the Keeper app.
// It manages the state of notes, handles creating, editing, and deleting notes,
// and renders the Header, Footer, CreateArea, and NotesList components.

function App() {

  const [notes, setNotes] = useState([]);

  const createNote = (noteTitle, noteContent) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          id: uuidv4(),
          title: noteTitle,
          content: noteContent,
        }
      ]
    })
  }

  // The editNote function updates a specific note in the notes array.
  // It takes an id and a changes object as arguments, maps through the notes array,
  // and replaces the note with the matching id with the updated title and content.
  const editNote = (id, changes) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note, index) => {
        if (note.id === id) {
          return { ...note, ...changes };
        }
        return note;
      })
    })
  };

  // Deletes a note by filtering out the note with the matching id
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  return (
    <div>
      <Header />
      <CreateArea onCreateNote={createNote} />
      <NotesList notes={notes} onDelete={deleteNote} onEdit={editNote}/>
      <Footer />
    </div>
  );
};

export default App;
