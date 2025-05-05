# Keeper App (v1.3) (TypeScript)

This project is a full-stack web application for creating, editing, and deleting notes. It includes a **React frontend** and a **Node.js backend** with a PostgreSQL database.

## 💫 Features

- **Frontend**:
  - Create, edit, and delete notes.
  - Notes are displayed dynamically based on the database.
  - Responsive UI built with React.
- **Backend**:
  - RESTful API for managing notes.
  - PostgreSQL database for storing notes.
  - CORS enabled for cross-origin requests.
- **Database**:
  - Notes are stored in a PostgreSQL table with fields for `id`, `title`, and `content`.

## 🔍 Technologies Used

- **Frontend**: React, Axios, Vite
- **Backend**: Node.js, Express.js, PostgreSQL
- **Database**: PostgreSQL
- **Environment Variables**: `dotenv`

## 💫 Project Structure

```bash
keeper-app/
├── back-end/
│   ├── .env                     # Environment variables
│   ├── index.ts                 # Main backend server file
│   ├── package.json             # Backend dependencies
│   ├── pnpm-lock.yaml           # Backend lockfile
│   ├── tsconfig.json            # TypeScript configuration
├── front-end/
│   ├── index.html               # Frontend entry point
│   ├── package.json             # Frontend dependencies
│   ├── pnpm-lock.yaml           # Frontend lockfile
│   ├── vite.config.js           # Vite configuration
│   ├── public/
│   │   └── styles.css           # Global styles
│   └── src/
│       ├── index.tsx            # Frontend entry point
│       └── components/
│           ├── App.tsx          # Main React component
│           ├── CreateArea.tsx   # Component for creating notes
│           ├── Footer.tsx       # Footer component
│           ├── Header.tsx       # Header component
│           ├── Note.tsx         # Individual note component
│           └── NotesList.tsx    # Component for rendering the list of notes
└── README.md                    #Project documentation
```

## 💻 Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd back-end
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up the `.env` file:
   Create a `.env` file in the `back-end` directory and add the following:
   ```bash
   PG_USERNAME=your_postgres_username
   PG_PASSWORD=your_postgres_password
   PG_HOST=localhost
   PG_DATABASE=your_database_name
   PG_PORT=5432
   ```
4. Start the backend server:
   ```bash
   pnpm dev
   ```
   The backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the frontend development server:
   ```bash
   pnpm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### Database Setup

1. Create a PostgreSQL database.
2. Create a `notes` table with the following schema:
   ```sql
   CREATE TABLE notes (
       id UUID PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL
   );
   ```

## 💡 Usage

1. Open the frontend in your browser at `http://localhost:5173`.
2. Use the app to create, edit, and delete notes.
3. Notes will be dynamically updated based on the database.

## 📲 API Endpoints

### GET `/api/notes`

- **Description**: Fetch all notes.
- **Response**: Array of notes.

### POST `/api/notes`

- **Description**: Create a new note.
- **Request Body**:
  ```json
  {
    "id": "uuid",
    "title": "Note title",
    "content": "Note content"
  }
  ```
- **Response**: The created note.

### PUT `/api/notes/:id`

- **Description**: Update an existing note.
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "content": "Updated content"
  }
  ```
- **Response**: The updated note.

### DELETE `/api/notes/:id`

- **Description**: Delete a note by ID.
- **Response**: Confirmation message.

## 🗄️ Environment Variables

The app uses the following environment variables:

| Variable      | Description                         |
| ------------- | ----------------------------------- |
| `PG_USERNAME` | PostgreSQL username                 |
| `PG_PASSWORD` | PostgreSQL password                 |
| `PG_HOST`     | PostgreSQL host (e.g., `localhost`) |
| `PG_DATABASE` | PostgreSQL database name            |
| `PG_PORT`     | PostgreSQL port (default: `5432`)   |

## 🔑 Dependencies

### Backend

- `express`: Web framework for Node.js.
- `pg`: PostgreSQL client for Node.js.
- `dotenv`: For managing environment variables.
- `cors`: For enabling cross-origin requests.
- `uuid`: For generating unique IDs.

### Frontend

- `react`: JavaScript library for building user interfaces.
- `axios`: For making HTTP requests.
- `vite`: Frontend build tool.
- `react-toastify`: For toast notifications.

## 🖋️ Acknowledgments

This project is part of the Udemy course on React and Node.js development. Special thanks to the course instructor for guidance.

## 📋 Future Improvements

1. Add update and edit functionality. [DONE => v1.1]
2. Add persistent storage using local storage or a backend API. [DONE => v1.2]
3. Implement search functionality to filter notes.
4. Add categories or tags for better organization.
5. Improve styling for a more polished user interface.
