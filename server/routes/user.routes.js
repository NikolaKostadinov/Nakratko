import express from 'express';

import { authenticateAdmin } from '../middleware/auth.js';
import * as controllers from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/user/:id', authenticateAdmin, controllers.getUser);
router.post('/login', controllers.loginUser);
router.post('/register', controllers.registerUser);

export default router;