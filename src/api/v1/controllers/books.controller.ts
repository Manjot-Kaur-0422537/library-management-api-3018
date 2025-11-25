import { Request, Response, NextFunction } from 'express';
import * as BooksService from '../services/books.service';
import * as Joi from 'joi';

const bookSchema = Joi.object({
  title: Joi.string().required(),
  authorId: Joi.string().required(),
  publishedYear: Joi.number().integer().optional(),
  isbn: Joi.string().optional(),
  copies: Joi.number().integer().min(0).default(1),
});

export const getAllBooks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await BooksService.getAll();
    res.json(books);
  } catch (err) { next(err); }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BooksService.getById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) { next(err); }
};

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const created = await BooksService.create(value);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const updated = await BooksService.update(req.params.id, value);
    if (!updated) return res.status(404).json({ message: 'Book not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await BooksService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
