import { Request, Response, NextFunction } from 'express';
import * as AuthorsService from '../services/authors.service';
import  * as Joi from 'joi';

const authorSchema = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string().allow('').optional(),
  birthYear: Joi.number().integer().optional(),
});

export const getAllAuthors = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await AuthorsService.getAll();
    res.json(authors);
  } catch (err) { next(err); }
};

export const getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await AuthorsService.getById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (err) { next(err); }
};

export const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = authorSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const created = await AuthorsService.create(value);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

export const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = authorSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const updated = await AuthorsService.update(req.params.id, value);
    if (!updated) return res.status(404).json({ message: 'Author not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await AuthorsService.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Author not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
