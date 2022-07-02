import express from 'express';

import * as controllers from '../controllers/book.controllers.js';

const router = express.Router();

router.get('/', controllers.getAllBooks);
router.post('/', controllers.postBook);

export default router;