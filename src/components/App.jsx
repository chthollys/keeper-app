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

  const editNote = (id, changes) => {
    console.log(changes);
    setNotes((prevNotes) => {
      return prevNotes.map((_, index) => {
        if (index == id) {
          return { title: changes.title, content: changes.content };
        }
      })
    })
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((_, index) => index !== id);
    })
  };

  return (
    <div>
      <Header />
      <CreateArea onSubmitApp={appendNote} />
      {notes.map((item, index) => (
        <Note
          key={index}
          id={index}
          title={item.title}
          content={item.content}
          onClickDelete={deleteNote}
          onClickEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
