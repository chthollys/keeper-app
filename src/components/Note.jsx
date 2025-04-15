import React, { useState } from "react";

function Note({ id, title, content, onClickDelete}) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => onClickDelete(id)}>DELETE</button>
    </div>
  );
}

export default Note;