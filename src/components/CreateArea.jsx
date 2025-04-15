import React, { useState } from "react";

function CreateArea({ onSubmitApp }) {

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
    try {
      setErrorMessage(""); // Clear error message on successful submission
      onSubmitApp(title, content);
      setTitle("");
      setContent("");
      // console.log("Succesfully requested onSubmitAction");
    } catch (error) {
      console.error("Error occurred while submitting the note:", error);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitAction}>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={trackValue}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
