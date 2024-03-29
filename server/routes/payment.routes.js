import express from 'express';

import * as controllers from '../controllers/payment.controllers.js';

import { authenticateUser } from '../middleware/authuser.js';

const router = express.Router();

router.post('/subscribe', authenticateUser, controllers.createSubscription);
router.delete('/unsubscribe', authenticateUser, controllers.deleteSubscription);

export default router;