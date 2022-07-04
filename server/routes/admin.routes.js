import express from 'express';

import { authenticateAdmin } from '../middleware/authadmin.js';
import * as controllers from '../controllers/admin.controllers.js';

const router = express.Router();

router.patch('/setrole', authenticateAdmin, controllers.setRole);
router.patch('/removerole', authenticateAdmin, controllers.removeRole);

export default router;