import React, { useState } from "react";

function CreateArea({ onCreateNote }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const trackValue = (event) => {
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

  const isEmpty = (str) => str.trim() === "";

  const onSubmitAction = (event) => {
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
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={trackValue}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={content}
          onChange={trackValue}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
