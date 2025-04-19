import React, { useState } from "react";

function Note({ id, title, content, onClickDelete, onClickEdit}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmpty = (str) => str.trim() === "";

  const editTrueState = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(true);
  };

  const trackEditedValue = (event) => {
    const {name, value} = event.target;
    if (name == "editedTitle") {
      setEditedTitle(value);
    } else if (name == "editedContent") {
      setEditedContent(value);
    } else {
      console.error("No target with the given name of : ", name)
    }
  };

  const onSubmitSecondary = (event) => {
    event.preventDefault();
    const isFormIncomplete = isEmpty(editedTitle) || isEmpty(editedContent);
    if (isFormIncomplete) {
      setErrorMessage("Please complete the note.");
      return;
    }
    try {
      setErrorMessage("");
      onClickEdit(id, { title: editedTitle, content: editedContent });
      setIsEditing(false);
    } catch(error) {
      console.error("Error occurred while submitting the note:", error);
    }
  };

  return (
    <div className="note">
      { isEditing ? (
        <form className="secondary-form" onSubmit={onSubmitSecondary}>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <input
            name="editedTitle"
            placeholder="Title"
            value={editedTitle}
            onChange={trackEditedValue}
            className="h1"
          />
          <textarea
            name="editedContent"
            placeholder="Take a note..."
            value={editedContent}
            onChange={trackEditedValue}
            className="paragraph"
          />
          <div className="button-container">
            <button type="submit">SAVE</button>
            <button onClick={() => setIsEditing(false)}>CANCEL</button>
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