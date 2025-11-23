import { Request, Response, NextFunction } from 'express';
import * as BorrowService from '../services/borrow.service';
import * as Joi from 'joi';

const borrowSchema = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  borrowDate: Joi.date().optional(),
  dueDate: Joi.date().optional(),
});

export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = borrowSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const record = await BorrowService.borrow(value);
    res.status(201).json(record);
  } catch (err) { next(err); }
};

export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const record = await BorrowService.returnBorrow(id);
    if (!record) return res.status(404).json({ message: 'Borrow record not found' });
    res.json(record);
  } catch (err) { next(err); }
};
