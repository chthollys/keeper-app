import React, { ChangeEvent, FormEvent, useState } from "react";

interface CreateAreaProps {
  onCreateNote: (title: string, content: string) => void;
}

function CreateArea({ onCreateNote } : CreateAreaProps) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const trackValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    // console.log(name," => ", value);
    if (name == "title") {
      setTitle(value);
    } else if (name == "content") {
      setContent(value);
    } else {
      console.error("No target with the given name of : ", name)
    }
  };

  const isEmpty = (str: string) => str.trim() === "";

  const onSubmitAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isFormIncomplete = isEmpty(title) || isEmpty(content);
    if (isFormIncomplete == true) {
      setErrorMessage("Please complete the note");
      return;
    }
    setErrorMessage(""); // Clear error message on successful submission
    onCreateNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <div>
      <form className="main-form" onSubmit={onSubmitAction}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={trackValue}
          aria-label="Note Title"
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={3}
          value={content}
          onChange={trackValue}
          aria-label="Note Content"
        />
        <button type="submit">Add</button>
      </form>
      <style>
        {`
          .error-message {
            color: red;
            font-size: 0.9rem;
          }
        `}
      </style>
    </div>
  );
}

export default CreateArea;
