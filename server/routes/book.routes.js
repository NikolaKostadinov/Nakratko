import express from 'express';

import { authenticateUser } from '../middleware/authuser.js';
import { authenticateSubscribedUser } from '../middleware/authsubscription.js';
import { authenticateWriter } from '../middleware/authwriter.js';

import * as controllers from '../controllers/book.controllers.js';

const router = express.Router();

router.get('/', authenticateUser, controllers.getCoverBooks);
router.post('/', authenticateUser, controllers.getCoverBook);
router.get('/app/:bookId', authenticateSubscribedUser, controllers.getFullBook);
router.post('/app/add-to-favorites/:bookId', authenticateSubscribedUser, controllers.addToFavorites);
router.post('/app/remove-from-favorites/:bookId', authenticateSubscribedUser, controllers.removeFromFavorites);
router.post('/post/:bookId', authenticateWriter, controllers.postBook);
router.patch('/update/:bookId', authenticateWriter, controllers.updateBook);
router.delete('/delete/:bookId', authenticateWriter, controllers.deleteBook);

export default router;