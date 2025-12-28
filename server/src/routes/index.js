const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const bankRoutes = require('./bank.routes');
const farmingRoutes = require('./farming.routes');
const craftingRoutes = require('./crafting.routes');

router.use('/auth', authRoutes);
router.use('/bank', bankRoutes);
router.use('/farming', farmingRoutes);
router.use('/crafting', craftingRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
