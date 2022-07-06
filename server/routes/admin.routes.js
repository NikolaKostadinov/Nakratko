import express from 'express';

import { authenticateAdmin } from '../middleware/authadmin.js';
import * as controllers from '../controllers/admin.controllers.js';

const router = express.Router();

router.get('/getuser', authenticateAdmin, controllers.getUser);
router.patch('/updateuser', authenticateAdmin, controllers.updateUser);
router.delete('/deleteuser', authenticateAdmin, controllers.deleteUser);
router.patch('/setrole', authenticateAdmin, controllers.setRole);
router.patch('/removerole', authenticateAdmin, controllers.removeRole);

export default router;