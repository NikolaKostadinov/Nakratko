import express from 'express';

import { authenticateAdmin, authenticateRefresh } from '../middleware/auth.js';
import * as controllers from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/user/:id', authenticateAdmin, controllers.getUser);
router.post('/login', controllers.loginUser);
router.post('/register', controllers.registerUser);
router.get('/refresh', authenticateRefresh, controllers.refreshAccess);

export default router;