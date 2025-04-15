import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {

  const [notes, setNotes] = useState([]);

  const appendNote = (noteTitle, noteContent) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          title: noteTitle,
          content: noteContent,
        }
      ]
    });
  }

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((_, index) => index !== id);
    })
  };

  // useEffect(() => console.log(notes), [notes]);

  return (
    <div>
      <Header />
      <CreateArea onSubmitApp={appendNote} />
      {notes.map((item, index) => (
        <Note key={index} id={index} title={item.title} content={item.content} onClickDelete={deleteNote}/>
      ))}
      <Footer />
    </div>
  );
}

export default App;
