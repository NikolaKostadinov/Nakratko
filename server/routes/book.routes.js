import express from 'express';

import { authenticateUser } from '../middleware/authuser.js';
import { authenticateSubscribedUser } from '../middleware/authsubscription.js';
import { authenticateWriter } from '../middleware/authwriter.js';

import * as controllers from '../controllers/book.controllers.js';

const router = express.Router();

router.get('/', authenticateUser, controllers.getCoverBooks);
router.get('/:bookId', authenticateSubscribedUser, controllers.getFullBook);
router.post('/add-to-favorites/:bookId', authenticateSubscribedUser, controllers.addToFavorites);
router.post('/remove-from-favorites/:bookId', authenticateSubscribedUser, controllers.removeFromFavorites);
router.post('/', authenticateWriter, controllers.postBook);
router.patch('/', authenticateWriter, controllers.updateBook);
router.delete('/', authenticateWriter, controllers.deleteBook);

export default router;