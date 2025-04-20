import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotesList from "./NotesList"
import CreateArea from "./CreateArea";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// The App component serves as the main container for the Keeper app.
// It manages the state of notes, handles creating, editing, and deleting notes,
// and renders the Header, Footer, CreateArea, and NotesList components.

function App() {

  // const userId = uuidv4(); // Example only, usage will be implemented in the next patch

  const [notes, setNotes] = useState([]);
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes: ', error);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (title, content) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', {
        // userId: userId,
        id: uuidv4(),
        title: title,
        content: content,
      });
      console.log(response.data); // Handle success data
      fetchNotes();
    } catch (error) {
      console.error('Error creating note: ', error);
    }
  }

  // The editNote function updates a specific note in the notes array.
  // It takes an id and a changes object as arguments, maps through the notes array,
  // and replaces the note with the matching id with the updated title and content.
  const editNote = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/${id}`, updatedData);
      console.log(response.data); // Handle success data
      fetchNotes();
      alert('Successfully update the note!');
    } catch (error) {
      console.error('Error editing note: ', error);
      alert('Failed to update the note.');
    }
  };

  // Deletes a note by filtering out the note with the matching id
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log(response.data); // Handle success data
      fetchNotes();
      alert('Successfully delete the note!');
    } catch (error) {
      console.error('Error deleting note: ', error);
      alert('Failed to delete the note.');
    }
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
