import { Request, Response } from "express";
import { BorrowService } from "../services/borrow.service";
import { BorrowRepository } from "../repositories/borrow.repository";

const borrowService = new BorrowService(new BorrowRepository());

export const borrowBook = async (req: Request, res: Response) => {
  const borrowData = req.body;
  const result = await borrowService.borrowBook(borrowData);
  res.json(result);
};

export const returnBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await borrowService.returnBook(id); 
  res.json(result);
};
