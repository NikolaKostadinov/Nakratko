import express from 'express';

import { authenticateUser, authenticateUserRefresh } from '../middleware/authuser.js';
import * as controllers from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/login', controllers.loginUser);
router.post('/register', controllers.registerUser);
router.get('/refresh', authenticateUserRefresh, controllers.refreshAccess);
router.get('/', authenticateUser, controllers.getUser);
router.patch('/update', authenticateUser, controllers.updateUser);
router.delete('/delete', authenticateUser, controllers.deleteUser);

export default router;