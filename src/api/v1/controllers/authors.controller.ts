import { Request, Response } from 'express';
import * as AuthorsRepo from '../repositories/authors.repository';

export const getAll = async (req: Request, res: Response) => {
  try {
    const authors = await AuthorsRepo.findAll();
    res.json(authors);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const author = await AuthorsRepo.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(author);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newAuthor = await AuthorsRepo.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updatedAuthor = await AuthorsRepo.update(req.params.id, req.body);

    if (!updatedAuthor) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json(updatedAuthor);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await AuthorsRepo.remove(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Author not found' });
    }

    res.json({ message: 'Author deleted' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
