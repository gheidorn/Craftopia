const express = require('express');
const router = express.Router();
const farmingController = require('../controllers/farming.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All farming routes require authentication
router.use(authMiddleware);

router.post('/start', farmingController.startFarming);
router.get('/active', farmingController.getActiveSession);
router.post('/:sessionId/collect', farmingController.collectFarming);
router.post('/:sessionId/cancel', farmingController.cancelFarming);
router.get('/history', farmingController.getFarmingHistory);

module.exports = router;
