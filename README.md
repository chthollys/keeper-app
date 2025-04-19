# Keeper App (v1.1)

This is a **Keeper App** built with **React**. It allows users to create, view, and delete notes dynamically. The project demonstrates the use of React hooks to manage state and lifecycle events.

---

## Features

- **Create Notes**: Users can add new notes with a title and content.
- **View Notes**: All created notes are displayed dynamically on the page.
- **Edit Notes**: Users can edit their created notes by its title and content by clicking "EDIT" button.
git ls-remote --tags origin- **Delete Notes**: Users can delete individual notes by clicking the "DELETE" button.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/chthollys/keeper-app.git
   cd keeper-app
2. Install dependencies:
   ```bash
   pnpm install
3. Start the development server:
   ```bash
   pnpm run dev
4. Open the application in your browser at:
   ```bash
   http://localhost:3000

## Components

1. `App.jsx`
- Manages the overall state of the application, including the list of notes.
- Handles adding and deleting notes.
- Passes necessary props to child components (CreateArea and Note).
2. `CreateArea.jsx`
- A form component for creating new notes.
- Includes input fields for the note title and content.
- Handles form submission and passes the data to the parent component (App.jsx).
3. `NotesList.jsx`
- Represents list of note.
- Displays the notes with its corresponding properties.
4. `Note.jsx`
- Represents individual notes.
- Displays the note title and content.
- Includes "EDIT" and "DELETE" button to edit and remove the note.
5. `Header.jsx` and `Footer.jsx` : Simple components for the app's header and footer.

## Future Improvements
1. Add update and edit functionality. [DONE => v1.1]
2. Add persistent storage using local storage or a backend API.
3. Implement search functionality to filter notes.
4. Add categories or tags for better organization.
5. Improve styling for a more polished user interface.