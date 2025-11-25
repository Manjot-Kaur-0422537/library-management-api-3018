import { Router } from 'express';
import * as BorrowController from '../controllers/borrow.controller';

const router = Router();

router.post('/', BorrowController.borrowBook);      
router.put('/:id', BorrowController.returnBook);    

export default router;
