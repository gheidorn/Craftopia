const express = require('express');
const router = express.Router();
const craftingController = require('../controllers/crafting.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All crafting routes require authentication
router.use(authMiddleware);

router.get('/components', craftingController.getComponents);
router.get('/components/:componentId', craftingController.getComponentDetails);
router.post('/start', craftingController.startCrafting);
router.get('/active', craftingController.getActiveSessions);
router.post('/:sessionId/collect', craftingController.collectCrafting);
router.post('/:sessionId/cancel', craftingController.cancelCrafting);
router.get('/history', craftingController.getCraftingHistory);

module.exports = router;
