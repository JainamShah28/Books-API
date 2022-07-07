import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { connection } from './database.js';

import books from './api/routes/books.js';

dotenv.config();

const app = express(),
    port = process.env.PORT || '3000',
    host = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: "*",
    optionsSuccessStatus: 200
}));

app.use('/public/uploads', express.static(path.join(process.cwd(), 'public/uploads')));
app.use('/books', books);

app.listen(port, host, (err) => {
    if (err) {
        console.log("Failed to start the server!");
    } else {
        connection.connect((err) => {
            if (err) {
                throw err;
            } else {
                console.log(`Server is running at http://${host}:${port}`);
            }
        });
    }
});