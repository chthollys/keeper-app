import React, { ChangeEvent, FormEvent, useState, useRef } from "react";

interface NoteProps {
  id: string;
  title: string;
  content: string;
  onClickDelete: (id: string) => void;
  onClickEdit: (
    id: string,
    updatedData: { title: string; content: string }
  ) => void;
}

function Note({ id, title, content, onClickDelete, onClickEdit }: NoteProps) {
  const editedTitle = useRef<HTMLInputElement>(null);
  const editedContent = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmpty = (str: string) => str.trim() === "";

  const editTrueState = () => {
    setIsEditing(true);
    setErrorMessage("");
  };

  const onSubmitSecondary = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let inputTitle = editedTitle.current?.value ?? "";
    let inputContent = editedContent.current?.value ?? "";
    const isFormIncomplete =
      isEmpty(inputTitle) ||
      isEmpty(inputContent);
    if (isFormIncomplete) {
      setErrorMessage("Please complete the note.");
      return;
    }
    try {
      onClickEdit(id, { title: inputTitle, content: inputContent });
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          "Error editing note: ",
          (error as any)?.response?.data || error.message
        );
      } else {
        console.error("An unknown error occurred.");
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <form className="secondary-form" onSubmit={onSubmitSecondary}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            ref={editedTitle}
            name="editedTitle"
            placeholder={title}
            aria-label="Edit Note Title"
            className="h1"
          />
          <textarea
            ref={editedContent}
            name="editedContent"
            placeholder={content}
            aria-label="Edit Note Content"
            className="paragraph"
          />
          <div className="button-container">
            <button type="submit">SAVE</button>
            <button onClick={editTrueState}>CANCEL</button>
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
}

export default Note;
