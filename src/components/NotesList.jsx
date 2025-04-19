import React from "react";
import Note from "./Note";

function NotesList({ notes, onDelete, onEdit }) {
  return (
    <>
      {notes.map((item, _) => (
          <Note
          key={item.id}
          id={item.id}
          title={item.title}
          content={item.content}
          onClickDelete={onDelete}
          onClickEdit={onEdit}
          />
      ))}
    </>
  );
};

export default NotesList;