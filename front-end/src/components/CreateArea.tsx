import React, { ChangeEvent, FormEvent, useState, useRef } from "react";

interface CreateAreaProps {
  onCreateNote: (title: string, content: string) => void;
}

function CreateArea({ onCreateNote }: CreateAreaProps) {
  const title = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isEmpty = (str: string) => str.trim() === "";

  const onSubmitAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let inputTitle = title.current?.value ?? "";
    let inputContent = content.current?.value ?? "";
    const isFormIncomplete =
      isEmpty(inputTitle) ||
      isEmpty(inputContent);
    if (isFormIncomplete) {
      setErrorMessage("Please complete the note");
      return;
    }
    setErrorMessage(""); // Clear error message on successful submission
    onCreateNote(inputTitle, inputContent);
    if (title.current) title.current.value = "";
    if (content.current) content.current.value = "";
  };

  return (
    <div>
      <form className="main-form" onSubmit={onSubmitAction}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          ref={title}
          name="title"
          placeholder="Title"
          aria-label="Note Title"
        />
        <textarea
          ref={content}
          name="content"
          placeholder="Take a note..."
          rows={3}
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
