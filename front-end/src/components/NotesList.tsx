import React from "react";
import Note from "./Note";

interface NotesListProps {
  notes: { id: string; title: string; content: string }[];
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedData: { title: string; content: string }) => void;
}

function NotesList({ notes, onDelete, onEdit }: NotesListProps) {
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