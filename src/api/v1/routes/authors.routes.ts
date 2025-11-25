import { Router } from 'express';
import * as AuthorsController from '../controllers/authors.controller';

const router = Router();

router.get('/', AuthorsController.getAll);
router.get('/:id', AuthorsController.getById);
router.post('/', AuthorsController.create);
router.put('/:id', AuthorsController.update);
router.delete('/:id', AuthorsController.remove);

export default router;
