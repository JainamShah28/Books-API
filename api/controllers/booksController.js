import { query } from '../../database.js';
import fs from 'fs/promises';
import path from 'path';

const getAllBooks = async (req, res) => {
    try {
        const result = await query('SELECT * FROM Books');
        res.status(200).json({
            "success": true,
            "count": result.length,
            "data": result
        });
    } catch (err) {
        res.status(500).json({
            "success": false
        });
    }
};

const getBookByID = async (req, res) => {
    try {
        const result = await query(`SELECT * FROM Books WHERE bookID = ${req.params.bookID}`);

        if (result.length == 0) {
            return res.status(404).json({
                "success": false,
                "message": "Book doesn't exist"
            });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({
            "success": false
        });
    }
};

const addNewBook = async (req, res) => {
    try {
        const bookName = req.body.bookName,
            authorName = req.body.authorName,
            bookDesc = req.body.bookDesc,
            price = req.body.price,
            bookImg = `${req.protocol}://${req.headers.host}/public/uploads/${req.file.filename}`,
            book = await query(`SELECT * FROM Books WHERE bookName = "${bookName}"`);

        if (book.length > 0) {
            await fs.unlink(`./public/uploads/${req.file.filename}`);

            return res.status(400).json({
                "success": false,
                "message": "Book already exists"
            });
        }

        if (!bookName || !authorName || !bookDesc || !price || !req.file) {
            if (req.file) {
                await fs.unlink(`./public/uploads/${req.file.filename}`);
            }

            return res.status(400).json({
                "success": false,
                "message": "Empty fields are not allowed"
            });
        }

        await query(`INSERT INTO Books(bookName, authorName, bookDesc, price, bookImg)
            VALUES ("${bookName}", "${authorName}", "${bookDesc}", ${price}, "${bookImg}")`);

        const result = await query('SELECT * FROM Books');
        return res.status(201).json({
            "success": true,
            "count": result.length,
            "data": result
        });
    } catch (err) {
        res.status(500).json({
            "success": false
        });
    }
};

const updateBook = async (req, res) => {
    try {
        const bookDesc = req.body.bookDesc,
            price = req.body.price;

        if (bookDesc) {
            await query(`UPDATE Books SET bookDesc = "${bookDesc}"
            WHERE bookID = ${req.params.bookID}`);
        }

        if (price) {
            await query(`UPDATE Books SET price = ${price} 
            WHERE bookID = ${req.params.bookID}`);
        }

        if (req.file) {
            const bookImgURL = await query(`SELECT bookImg FROM Books WHERE bookID = ${req.params.bookID}`);
            await fs.unlink(`./public/uploads/${path.basename(bookImgURL[0].bookImg)}`);

            const bookImg = `${req.protocol}://${req.headers.host}/public/uploads/${req.file.filename}`;

            await query(`UPDATE Books SET bookImg = "${bookImg}" 
            WHERE bookID = ${req.params.bookID}`);
        }

        const result = await query(`SELECT * FROM Books WHERE bookID = ${req.params.bookID}`);

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({
            "success": false
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookImgURL = await query(`SELECT bookImg FROM Books WHERE bookID = ${req.params.bookID}`);

        if (bookImgURL.length == 0) {
            return res.status(404).json({
                "success": false,
                "message": "Book doesn't exist"
            });
        }

        await fs.unlink(`./public/uploads/${path.basename(bookImgURL[0].bookImg)}`);

        await query(`DELETE FROM Books WHERE bookID = ${req.params.bookID}`);

        const result = await query(`SELECT * FROM Books`);
        res.status(200).json({
            "success": true,
            "count": result.length,
            "data": result
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            "success": false
        });
    }
};

export { getAllBooks, getBookByID, addNewBook, updateBook, deleteBook };