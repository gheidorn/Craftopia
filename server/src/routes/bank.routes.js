const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bank.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All bank routes require authentication
router.use(authMiddleware);

router.get('/', bankController.getBank);
router.get('/materials', bankController.getMaterials);
router.get('/components', bankController.getComponents);
router.get('/items', bankController.getItems);
router.get('/tools', bankController.getTools);
router.get('/consumables', bankController.getConsumables);
router.get('/summary', bankController.getSummary);

module.exports = router;
