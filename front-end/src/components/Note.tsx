import React, { ChangeEvent, FormEvent, useState } from "react";

interface NoteProps {
  id: string;
  title: string;
  content: string;
  onClickDelete: (id: string) => void;
  onClickEdit: (id: string, updatedData: { title: string, content: string }) => void;
}

function Note({ id, title, content, onClickDelete, onClickEdit}: NoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmpty = (str: string) => str.trim() === "";

  const editTrueState = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(true);
  };

  const trackEditedValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    if (name == "editedTitle") {
      setEditedTitle(value);
    } else if (name == "editedContent") {
      setEditedContent(value);
    } else {
      console.error("No target with the given name of : ", name)
    }
  };

  const onSubmitSecondary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormIncomplete = isEmpty(editedTitle) || isEmpty(editedContent);
    if (isFormIncomplete) {
      setErrorMessage("Please complete the note.");
      return;
    }
    setErrorMessage("");
    try {
      onClickEdit(id, { title: editedTitle, content: editedContent });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error editing note: ", (error as any)?.response?.data || error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="note">
      { isEditing ? (
        <form className="secondary-form" onSubmit={onSubmitSecondary}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            name="editedTitle"
            placeholder="Title"
            value={editedTitle}
            onChange={trackEditedValue}
            aria-label="Edit Note Title"
            className="h1"
          />
          <textarea
            name="editedContent"
            placeholder="Take a note..."
            value={editedContent}
            onChange={trackEditedValue}
            aria-label="Edit Note Content"
            className="paragraph"
          />
          <div className="button-container">
            <button type="submit">SAVE</button>
            <button
              onClick={() => {
                setEditedTitle(title);
                setEditedContent(content);
                setIsEditing(false);
              }}
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1>{title}</h1>
          <p>{content}</p>
          <div className="button-container">
              <button onClick={editTrueState}>EDIT</button>
              <button onClick={() => onClickDelete(id)}>DELETE</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;