import express from 'express';
import multer from 'multer';

import { getAllBooks, getBookByID, addNewBook, updateBook, deleteBook} from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:bookID', getBookByID);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads');
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9),
            fileName = file.originalname.split(".");
        callback(null, fileName[0] + '-' + uniqueSuffix + '.' + fileName[1]);
    }
}),
    upload = multer({ 
        storage: storage, 
        limits: {
            fileSize: 5000000
        },
        fileFilter: (req, file, callback) => {
            if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
                callback(null, true);
            } else {
                callback(new Error('Only jpg, jpeg and png files are allowed!'), false);
            }
        }
    });

router.post('/', upload.single('bookImg'), addNewBook);

router.put('/:bookID', upload.single('bookImg'), updateBook);

router.delete('/:bookID', deleteBook);

export default router;