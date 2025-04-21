import express, { Request, Response } from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

const pool = new pg.Pool({
	user: process.env.PG_USERNAME,
	host: process.env.PG_HOST,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : undefined,
});

app.get("/api/notes", async (req: Request, res: Response) => {
	try {
		const result = await pool.query('SELECT * from notes');
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send('Server error.')
	}
});

app.post(
    "/api/notes",
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, content } = req.body;

            // Validate input
            if (!title || !content) {
                res.status(400).json({ error: 'All fields are required' });
				return;
            }

			const id = uuidv4();

            // Insert into the database
            const query = 'INSERT INTO notes (id, title, content) VALUES ($1, $2, $3) RETURNING *';
            const values = [id, title, content];
            const result = await pool.query(query, values);

            // Send the created note as a response
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error("Database failed in insertion process: ", error);
            res.status(500).json({ error: "Server Error" });
        }
    }
);

app.put(
	"/api/notes/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const noteId = req.params.id;
			const { title, content } = req.body;

			if (!title || !content) {
				res.status(400).json({ error: 'All Fields are required' });
				return;
			}

			const query = `
				UPDATE notes
				SET title = $1, content = $2
				WHERE id = $3
				RETURNING *;
			`;
			const values = [title, content, noteId];
			const result = await pool.query(query, values);

			// Check if the user was found and updated
			if (result.rows.length === 0) {
				res.status(404).json({ error: 'User not found' });
				return;
			}
			// Send the updated user back as a response
			res.status(200).json(result.rows[0]); // 200 indicates "OK"} catch (err) {
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Server Error" });
		}
	}
);

app.delete(
	"/api/notes/:id",
	async (req: Request, res: Response): Promise<void> => {
		try {
			const noteId = req.params.id;
			const result = await pool.query(`DELETE FROM notes WHERE id = $1 RETURNING *`, [noteId]);
			// Check if the note was found and deleted
			if (result.rows.length === 0) {
				res.status(404).json({ error: 'Note not found' });
				return;
			}
			// Send a success response
			res.status(200).json({ message: 'Note deleted successfully', note: result.rows[0] });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Server error' });
		}
	}
);

app.listen(PORT, () => {
	console.log(`Listening in port ${PORT}`);
});