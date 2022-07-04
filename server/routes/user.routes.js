import express from 'express';

import { authenticateUserRefresh } from '../middleware/authuser.js';
import { authenticateAdmin } from '../middleware/authadmin.js';
import * as controllers from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/', authenticateAdmin, controllers.getUser);
router.post('/login', controllers.loginUser);
router.post('/register', controllers.registerUser);
router.get('/refresh', authenticateUserRefresh, controllers.refreshAccess);

export default router;