import express from 'express';

import { authenticateUser, authenticateSubscribedUser, authenticateWriter } from '../middleware/auth.js';
import * as controllers from '../controllers/book.controllers.js';

const router = express.Router();

router.get('/', authenticateUser, controllers.getCoverBooks);
router.get('/:bookId', authenticateSubscribedUser, controllers.getFullBook);
router.post('/', authenticateWriter, controllers.postBook);

export default router;