import { Router } from 'express';
import * as BooksController from '../controllers/books.controller';

const router = Router();

router.get('/', BooksController.getAllBooks);
router.get('/:id', BooksController.getBookById);
router.post('/', BooksController.createBook);
router.put('/:id', BooksController.updateBook);
router.delete('/:id', BooksController.deleteBook);

export default router;
