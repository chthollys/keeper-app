import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotesList from "./NotesList";
import CreateArea from "./CreateArea";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Note {
  id: string;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes: ', error);
      toast.error('Failed to fetch notes. Please try again later.');
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = async (title: string, content: string) => {
    try {
      const response = await axios.post('http://localhost:3000/api/notes', {
        title: title,
        content: content,
      });
      console.log(response.data); // Handle success data
      fetchNotes();
      toast.success('Note created successfully!');
    } catch (error) {
      console.error('Error creating note: ', error);
      toast.error('Failed to create note.');
    }
  };

  const editNote = async (id: string, updatedData: { title: string; content: string }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/notes/${id}`, updatedData);
      console.log(response.data); // Handle success data
      fetchNotes();
      toast.success('Note updated successfully!');
    } catch (error) {
      console.error('Error editing note: ', error);
      toast.error('Failed to update note.');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/notes/${id}`);
      console.log(response.data); // Handle success data
      fetchNotes();
      toast.success('Note deleted successfully!');
    } catch (error) {
      console.error('Error deleting note: ', error);
      toast.error('Failed to delete note.');
    }
  };

  return (
    <div>
      <Header />
      <CreateArea onCreateNote={createNote} />
      <NotesList notes={notes} onDelete={deleteNote} onEdit={editNote} />
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
